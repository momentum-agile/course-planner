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
const pointRequirement = ["UPTO", "EXACT", "ATLEAST"]


getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

getRandomNumberInRange = (tic, toc) => Math.floor(Math.random() *(toc - tic -+1)) + tic

const generateCourseList = () => {
    const course0 = []
    for (let i = 0; i < 10; i++) {
        course0.push(getRandomElement(subjects) + " " + getRandomNumberInRange(100, 999))
    }
    return course0
}

const courses = generateCourseList()

const createRegulation = (i) => {
    const regulation = {
        points: getRandomElement(points),
        pointRequirement: getRandomElement(pointRequirement),
        // Pick a courseID from the required range. E.g a regulation in the last 20 will
        // have a course id from the last 20
        courses: [i >= 81 ? getCourseID(getRandomNumberInRange(81, 100)) :
        i < 81 && i >= 61 ? getCourseID(getRandomNumberInRange(61, 80)) :
        i < 61 && i >= 41 && getCourseID(getRandomNumberInRange(41, 60)) ]
    }
    return regulation
}

const generateRegulations = (amount) => {
    const regulations = []
    for (let i = 0; i < amount; i++) {
        regulations.push(createRegulation(i))
    }
    return regulations
}

const getCourseID = (i) => "5f4e14016282ae3706baf" + i.toString().padStart(3, '0');

const regulationsArray = generateRegulations(100)
// Last 20 reserved for prerequisites
// Second last 20 reserved for restrictions
// Third last 20 reserved for coRequisites
const coRequisites = regulationsArray.slice(41, 60)
const restrictions = regulationsArray.slice(61, 80)
const prerequisites = regulationsArray.slice(81, 100)

const createCourse = (i) => {
    // Only courses with an id less than 20 will have restrictions,prerequisites, co-requisites
    // or informal equivalents
    const course = {
        _id: getCourseID(i),
        name: faker.commerce.productName(),
        courseCode: courses[i],
        points: getRandomElement(points),
        semester: getRandomElement(semesters),
        restrictions: i < 20 ? getRandomElement(restrictions) : [],
        prerequisites: i < 20 ? getRandomElement(prerequisites) : [],
        corequisites: i < 20 ? getRandomElement(coRequisites) : [],
        description: faker.lorem.paragraph(),
        // Courses with id in 21-40 range reserved for informal equivalents
        informalEquivalents: i < 20 ? [getCourseID(getRandomNumberInRange(21, 40))] : [],
    };
    return course;
};

module.exports = {
    generateCourses,
};
