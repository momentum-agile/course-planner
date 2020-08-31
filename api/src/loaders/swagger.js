const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const setUpSwagger = (app) => {
    // Swagger set up
    const options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Course Planner API Documentation",
                description: "API definitions for Course Planner",
            },
            contact: {
                name: "Swagger",
            },
            servers: [
                {
                    url: "http://localhost:8080/",
                },
            ],
        },
        apis: ["./src/routes/*.js", "./src/models/*.js"],
    };
    const swaggerDocs = swaggerJsdoc(options);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
};

module.exports = setUpSwagger;
