const http = require('http');
const schedule = require('node-schedule');
const { app } = require('./app');
const controller = require('./socketInit');
const { loggerDailySchedule } = require('./errorLogger/loggerDailySchedule');

require('./dbMongo/mongoose');

const server = http.createServer(app);

const port = process.env.PORT ?? 5000;

server.listen(port);
controller.createConnection(server);

const job = schedule.scheduleJob('0 0 * * *', loggerDailySchedule);
