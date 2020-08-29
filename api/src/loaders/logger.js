const winston = require("winston");
const expressWinston = require("express-winston");

const setUpLogging = (app) => {
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf((info) => `${info.timestamp} [${info.level}] ${info.message} ${info.meta.res.statusCode}`),
            ),
        }),
    );
};

module.exports = setUpLogging;
