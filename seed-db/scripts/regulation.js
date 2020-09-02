
getRandomElement = (array) =>{
    return array[Math.floor(Math.random() * array.length)]
}
const points = [45,60,100]
const pointRequirement = ["UPTO", "EXACT", "ATLEAST"]

const createRegulation = (i) => {
    const regulation = {
        points: getRandomElement(points),
        pointRequirement: getRandomElement(pointRequirement),
        courses: []
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

module.exports = {
    generateRegulations,
};
