const fs = require('fs');
const path = require('path');

exports.errorLogger = async (err, req, res, next) => {
  let code;
  await res.on('finish', () => {
    code = res.statusCode;

    const errorLog = {
      message: err.message,
      time: Date.now(),
      code,
      stackTrace: err.stack,
    };

    const pathToDir = path.resolve(__dirname, '../errorLogs');
    if (!fs.existsSync(pathToDir)) {
      fs.mkdirSync(pathToDir);
    }
    const logFileName = 'errorLogs.json';
    const logFilePath = path.resolve(__dirname, pathToDir, logFileName);

    if (!fs.existsSync(logFilePath)) {
      const logs = [errorLog];
      const jsonLogs = JSON.stringify(logs, null, 2);
      fs.writeFile(logFilePath, jsonLogs, (e) => {
        if (e) {
          throw e;
        }
      });
    } else {
      fs.readFile(logFilePath, 'utf8', (error, data) => {
        if (error) {
          throw error;
        } else {
          const logs = JSON.parse(data);
          logs.push(errorLog);

          const jsonLogs = JSON.stringify(logs, null, 2);
          fs.writeFile(logFilePath, jsonLogs, (e) => {
            if (e) {
              throw e;
            }
          });
        }
      });
    }
  });
  next(err);
};
