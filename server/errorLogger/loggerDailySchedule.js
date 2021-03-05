const fs = require('fs');
const path = require('path');
const util = require('util');

exports.loggerDailySchedule = async () => {
  const existsPromisified = util.promisify(fs.exists);
  const writeFilePromisified = util.promisify(fs.writeFile);
  const readFilePromisified = util.promisify(fs.readFile);

  const logFileName = 'errorLogs.json';
  const logFilePath = path.resolve(__dirname, '../errorLogs', logFileName);
  const pastLogsFileName = `${new Date().toISOString()}.json`;
  const pastLogsFilePath = path.resolve(__dirname, '../errorLogs', pastLogsFileName);

  if (await existsPromisified(logFilePath)) {
    const data = await readFilePromisified(logFilePath);
    const logs = JSON.parse(data);
    const modifiedLogs = logs.map((i) => ({
      message: i.message,
      code: i.code,
      time: i.time,
    }));
    const jsonLogs = JSON.stringify(modifiedLogs, null, 2);
    await writeFilePromisified(pastLogsFilePath, jsonLogs);
    await writeFilePromisified(logFilePath, JSON.stringify([]));
  }
};
