const expressLoader = require("./express");
const loggerLoader = require("./logger");
const mongooseLoader = require("./mongoose");

module.exports = async (app) => {
    loggerLoader(app);
    await mongooseLoader();
    expressLoader(app);
};
