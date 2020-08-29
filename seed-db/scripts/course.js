const faker = require("faker");

const generateCourses = (amount) => {
    const courses = [];
    for (let i = 0; i < amount; i++) {
        courses.push(createCourse());
    }
    return courses;
};

const createCourse = () => {
    // Make this smarter
    const course = {
        courseName: faker.name.findName(),
    };
    return course;
};

module.exports = {
    generateCourses,
};
