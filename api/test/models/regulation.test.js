const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Regulation = require("../../src/models/regulation");
const Course = require("../../src/models/course");

let mongod;

beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const connString = await mongod.getConnectionString();
    await mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

beforeEach(async () => {
    const newCourse = Course({
        name: "Software Engineering Theory",
        courseCode: "SOFTENG701",
        points: 15,
        semester: ["SS"],
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        informalEquivalents: [],
        description: "Theory of engineering",
    });
    const newRegulation = Regulation({
        points: 90,
        pointRequirement: "UPTO",
        courses: [newCourse],
    });
    await newRegulation.save();
});

afterEach(async () => {
    await Regulation.collection.drop();
});

test("Get all the regulations successfully", async () => {
    const fromDb = await Regulation.find({});
    expect(fromDb).toBeTruthy();
    expect(fromDb.length).toBe(1);
    expect(fromDb[0].points).toBe(90);
    expect(fromDb[0].pointRequirement).toBe("UPTO");
    expect(fromDb[0].courses.length).toBe(1);
});
