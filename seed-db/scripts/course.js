const faker = require('faker');
const generateCourses = (amount) => {
    const courses = [];
    for (let i = 0; i < amount; i++) {
        courses.push(createCourse(i));
    }
    return courses;
};

getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const points = [15]
const semesters = ["S1", "S2", "SS"]
const subjects = ["SOFTENG", "COMPSCI", "ENGGEN"]

const generateCourseList = () => {
    const course0 = []
    for (let i = 0; i < 10; i++) {
        course0.push(getRandomElement(subjects) + " " + Math.floor(Math.random() * 999))
    }
    return course0
}

const courses = generateCourseList()

const createCourse = (i) => {
    // Make this smarter
    const course = {
        name: faker.commerce.productName(),
        courseCode: courses[i],
        points: getRandomElement(points),
        semester: getRandomElement(semesters),
        restrictions: [],
        prerequisites: [],
        corequisites: [],
        description: faker.lorem.paragraph(),
        informalEquivalents: []
    };
    return course;
};

module.exports = {
    generateCourses,
};
