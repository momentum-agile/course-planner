const express = require("express");
const loaders = require("./loaders");
const logger = require("./common/logger");
const port = process.env.PORT || 3001;

//separate out to be used for supertest
const app = express();

const startServer = async () => {
    await loaders(app);
};

startServer();
const server = app.listen(port, () => logger.info(`Server running on port ${port} :)`));

module.exports = server;
