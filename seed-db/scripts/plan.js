const faker = require("faker");

const generatePlans = (amount, programs, students) => {
    const plans = [];

    for (let i = 0; i < amount; i++) {
        plans.push(createPlan(i, getRandomElement(programs), students[i]));
    }

    return plans;
};
const getRandomNumberInRange = (tic, toc) => Math.floor(Math.random() * (toc - tic - +1)) + tic;
const getPlanID = (i) => {
    return {
        $oid: i.toString().padStart(24, "DefacedC0ffeeBabeB0b0000"),
    };
};
const getCourseID = () => {
    return {
        $oid: getRandomNumberInRange(0, 39).toString(16).padStart(24, "DefacedC0ffeeBabeB0b3000"),
    };
};
const semesters = ["S1", "S2", "SS"];

getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const createCourseAllocation = () => {
    return {
        course: getCourseID(),
        note: faker.lorem.paragraph(),
        year: getRandomNumberInRange(2020, 2035),
        semester: getRandomElement(semesters),
    };
};

const createPlan = (i, program, student) => {
    const newPlan = {
        _id: getPlanID(i),
        name: student.name + "'s Plan",
        student: student._id,
        courseAllocations: [createCourseAllocation()],
        programmeDegree: program._id,
        startYear: getRandomNumberInRange(2019, 2024),
        numYears: getRandomNumberInRange(1, 3),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAT: new Date().toISOString(),
    };
    student.plans = [getPlanID(i)];
    return newPlan;
};

module.exports = {
    generatePlans: generatePlans,
};
