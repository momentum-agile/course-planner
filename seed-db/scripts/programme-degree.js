const programmeDegreeNames = ["SOFTENG", "COMPSYS"];

const generateProgrammeDegrees = () => {
    const programmeDegrees = [];

    for (let i = 0; i < programmeDegreeNames.length; i++) {
        programmeDegrees.push(createProgrammeDegree(programmeDegreeNames[i], i));
    }

    return programmeDegrees;
};
const getProgrammeDegreeID = (i) => {
    return {
        "$oid": i.toString().padStart(24, 'DefacedC0ffeeBabeB0b2000')
    }
}

const createProgrammeDegree = (name, i) => {
    const programmeDegree = {
        _id: getProgrammeDegreeID(i),
        name: name,
        regulations: [],
        defaultPlan: null,
    };

    return programmeDegree;
};

module.exports = {
    generateProgrammeDegrees: generateProgrammeDegrees,
};
