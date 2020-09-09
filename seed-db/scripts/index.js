
const yargs = require("yargs");
const fs = require("fs");
const { generateCourses } = require("./course");
const { generateProgrammeDegrees } = require("./programme-degree");
const { generateStudents } = require("./students");


const courseFilename = "./fakeCourses.json";
const programmeDegreeFilename = "./fakeProgrammeDegrees.json";
const studentFilename = "./fakeStudents.json";

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

const writeFile = (filename, obj) => {
    const jsonObj = JSON.stringify(obj);
    fs.writeFileSync(filename, jsonObj);
}

if (argv.hasOwnProperty("amount")) {
    const amount = argv.amount;
    writeFile(courseFilename, generateCourses(amount))
    writeFile(studentFilename, generateStudents(amount / 10))
    writeFile(programmeDegreeFilename, generateProgrammeDegrees())
}
