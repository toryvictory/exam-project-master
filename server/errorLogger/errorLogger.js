const fs = require('fs');
const path = require('path');
const util = require('util');

exports.errorLogger = async (err, req, res, next) => {
  const onPromisified = (event) => new Promise((resolve) => res.on(event, () => resolve()));
  const existsPromisified = util.promisify(fs.exists);
  const mkdirPromisified = util.promisify(fs.mkdir);
  const writeFilePromisified = util.promisify(fs.writeFile);
  const readFilePromisified = util.promisify(fs.readFile);

  try {
    const pathToDir = path.resolve(__dirname, '../errorLogs');

    if (!await existsPromisified(pathToDir)) {
      await mkdirPromisified(pathToDir);
    }
    const logFileName = 'errorLogs.json';
    const logFilePath = path.resolve(__dirname, pathToDir, logFileName);

    onPromisified('finish').then(async () => {
      const errorLog = {
        message: err.message,
        time: Date.now(),
        code: res.statusCode,
        stackTrace: err.stack,
      };

      if (!await existsPromisified(logFilePath)) {
        const logs = [errorLog];
        const jsonLogs = JSON.stringify(logs, null, 2);
        await writeFilePromisified(logFilePath, jsonLogs, 'utf8');
      } else {
        const data = await readFilePromisified(logFilePath, 'utf8');
        const logs = JSON.parse(data);
        logs.push(errorLog);
        const jsonLogs = JSON.stringify(logs, null, 2);
        await writeFilePromisified(logFilePath, jsonLogs, 'utf8');
      }
    });
    next(err);
  } catch (e) {
    next(e);
  }
};
