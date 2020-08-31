const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const ProgrammeDegree = require("../../src/models/programme-degree");

let mongod;

var testId = mongoose.Types.ObjectId();
var testId2 = mongoose.Types.ObjectId();

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
    const newProgrammeDegree = new ProgrammeDegree({
        _id: testId,
        name: "BE (Hons) SE 2020",
        regulations: [],
        defaultPlan: null,
    });

    await newProgrammeDegree.save();
});

afterEach(async () => {
    await ProgrammeDegree.collection.drop();
});

test("Get a specified ProgrammeDegree successfully", async () => {
    const fromDb = await ProgrammeDegree.find({ _id: testId });
    expect(fromDb).toBeTruthy();
});

test("Create and get a second specified ProgrammeDegree successfully", async () => {
    const mockCourse = {
        _id: mongoose.Types.ObjectId(),
        name: "A Fake Course",
        courseCode: "Mocking101",
        points: 15,
        semester: ["SS"],
        prerequisites: [],
        corequisites: [],
        restrictions: [],
        informalEquivalents: [],
        description: "Fake it til you make it",
    };
    const mockRegulation = {
        _id: mongoose.Types.ObjectId(),
        pointRequirement: "UPTO",
        courses: [mockCourse],
    };
    const newProgrammeDegree = new ProgrammeDegree({
        _id: testId2,
        name: "Be (Hons) CSE",
        regulations: [mockRegulation],
        defaultPlan: null,
    });

    await newProgrammeDegree.save();

    const fromDb = await ProgrammeDegree.find({ _id: testId2 });

    expect(fromDb).toBeTruthy();
    expect(fromDb[0].defaultPlan).toBeNull();
    expect(fromDb[0].regulations.length).toBe(1);
});

test("Delete ProgrammeDegree from the database", async () => {
    await ProgrammeDegree.findByIdAndDelete(testId);
    const dbResponse = await ProgrammeDegree.find({ _id: testId });

    expect(dbResponse[0]).toBe(undefined);
});
