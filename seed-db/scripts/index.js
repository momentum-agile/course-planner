
const yargs = require("yargs");
const fs = require("fs");
const { generateCourses } = require("./course");
const { generateProgrammeDegrees } = require("./programme-degree");
const { generateStudents } = require("./students");
const { generatePlans } = require("./plan");


const courseFilename = "./fakeCourses.json";
const programmeDegreeFilename = "./fakeProgrammeDegrees.json";
const studentFilename = "./fakeStudents.json";
const planFilename = "./fakePlans.json";

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
    const students = generateStudents(amount/10)
    const programs = generateProgrammeDegrees()
    const plans = generatePlans(amount/10,programs,students)
    writeFile(studentFilename, students)
    writeFile(programmeDegreeFilename, programs)
    writeFile(planFilename, plans)
}
