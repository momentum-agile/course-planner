const programmeDegreeNames = ["SOFTENG", "COMPSYS"];

const generateProgrammeDegrees = () => {
    const programmeDegrees = [];

    for (let i = 0; i < programmeDegreeNames.length; i++) {
        programmeDegrees.push(createProgrammeDegree(programmeDegreeNames[i]));
    }

    return programmeDegrees;
};

const createProgrammeDegree = (name) => {
    const programmeDegree = {
        name: name,
        regulations: [],
        defaultPlan: null,
    };

    return programmeDegree;
};

module.exports = {
    generateProgrammeDegrees: generateProgrammeDegrees,
};
