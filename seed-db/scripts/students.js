const faker = require('faker');


const generateStudents = (amount) => {
    const students = [];
    for (let i = 0; i < amount; i++) {
        students.push(createStudent(i));
    }
    return students;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getStudentID = (i) => {
    return {
        "$oid": i.toString().padStart(24, 'DefacedC0ffeeBabeB0b1000')
    }
}


const createStudent = (i) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const upi = firstName.substring(0, 1).toLowerCase() + lastName.substring(0, 3).toLowerCase() + getRandomInt(100, 999);
    const student = {
        _id: getStudentID(i),
        name: firstName + " " + lastName,
        id: getRandomInt(100000000, 999999999),
        upi: upi,
        yearLevel: getRandomInt(1, 5),
        plans: [],
    };

    return student;
};

module.exports = {
    generateStudents,
};
