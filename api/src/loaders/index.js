const expressLoader = require("./express");
const loggerLoader = require("./logger");
const mongooseLoader = require("./mongoose");
const swaggerLoader = require("./swagger");

module.exports = async (app) => {
    loggerLoader(app);
    await mongooseLoader();
    expressLoader(app);
    swaggerLoader(app);
};
