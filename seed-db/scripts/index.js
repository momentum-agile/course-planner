const yargs = require("yargs");
const fs = require("fs");
const { generateCourses } = require("./course");

const filename = "./fake-courses.json";

const argv = yargs
    .command("amount", "Decides the number of courses to generate", {
        amount: {
            description: "The amount to generate",
            alias: "a",
            type: "number",
        },
    })
    .help()
    .alias("help", "h").argv;

if (argv.hasOwnProperty("amount")) {
    const amount = argv.amount;
    const courses = generateCourses(amount);

    const jsonObj = JSON.stringify(courses);
    fs.writeFileSync(filename, jsonObj);
}
