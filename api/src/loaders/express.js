const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routes");

const setUpExpress = (app) => {
    app.enable("trust proxy");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(routes);

    app.get("/heartbeat", (req, res) =>
        res.send({
            dateTime: new Date().toJSON(),
        }),
    );
};
module.exports = setUpExpress;
