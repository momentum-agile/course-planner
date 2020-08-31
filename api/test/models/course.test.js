const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
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
    const newCourse = new Course({
        name: "Software Engineering Theory",
        courseCode: "SOFTENG701",
        points: 15,
        semester: ["SS"],
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        description: "Theory of engineering",
    });

    await newCourse.save();
});

afterEach(async () => {
    await Course.collection.drop();
});

test("Get a specified Course successfully", async () => {
    const fromDb = await Course.find({ courseCode: "SOFTENG701" });

    expect(fromDb).toBeTruthy();
});

test("Create and get a second specified Course successfully", async () => {
    const newCourse = new Course({
        name: "Agile",
        courseCode: "SOFTENG761",
        points: 15,
        semester: ["S2"],
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        informalEquivalents: [],
        description: "Learn about Agile!",
    });

    await newCourse.save();

    const fromDb = await Course.find({ courseCode: "SOFTENG761" });

    expect(fromDb[0].name).toBe("Agile");
    expect(fromDb[0].courseCode).toBe("SOFTENG761");
    expect(fromDb[0].points).toBe(15);
    expect(fromDb[0].semester).toEqual(expect.arrayContaining(["S2"]));
    expect(fromDb[0].prerequisites).toEqual(expect.arrayContaining([]));
    expect(fromDb[0].corequisites).toEqual(expect.arrayContaining([]));
    expect(fromDb[0].restrictions).toEqual(expect.arrayContaining([]));
    expect(fromDb[0].informalEquivalents).toEqual(expect.arrayContaining([]));
    expect(fromDb[0].description).toBe("Learn about Agile!");
});

test("Delete Course from the database", async () => {
    await Course.deleteOne({ courseCode: "SOFTENG701" });
    const dbResponse = await Course.find({ courseCode: "SOFTENG701" });

    expect(dbResponse[0]).toBe(undefined);
});

test("Throw an error when trying to create a Course with a courseCode that's not unique", async () => {
    const duplicateCourse = new Course({
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

    await duplicateCourse.save((err) => {
        if (err) {
            expect(err.name).toBe("ValidationError");
            expect(err.errors.courseCode.message).toBe("Error, expected `courseCode` to be unique. Value: `SOFTENG701`");
        } else {
            fail("Should throw an error due to non-unique courseCode");
        }
    });
});
