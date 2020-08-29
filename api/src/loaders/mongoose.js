require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.DB_CONN_URL;
const LOGGER = require("../common/logger");

const connectToMongoose = async () => {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    const db = mongoose.connection;

    db.once("open", () => {
        LOGGER.info("Connected to MongoDB");
    });

    db.on("error", () => {
        LOGGER.error("Error for MongoDB");
    });
};

module.exports = connectToMongoose;
