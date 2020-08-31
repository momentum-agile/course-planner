const express = require("express");
const loaders = require("./loaders");
const logger = require("./common/logger");
const port = process.env.PORT || 3001;

const startServer = async () => {
    const app = express();
    await loaders(app);
    app.listen(port, () => logger.info(`Server running on port ${port} :)`));
};

startServer();

module.exports = startServer;
