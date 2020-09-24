const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Plan = require("../../src/models/plan");
const Student = require("../../src/models/student");
const ProgrammeDegree = require("../../src/models/programme-degree");
const Course = require("../../src/models/course");

let mongod;

var testId = mongoose.Types.ObjectId();
var testId2 = mongoose.Types.ObjectId();
var testId3 = mongoose.Types.ObjectId();

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
    const newPlan = new Plan({
        _id: testId,
        name: "new mock plan",
        student: new Student(),
        courseAllocations: null,
        programmeDegree: new ProgrammeDegree(),
        startYear: 2019,
        numYears: 2030,
        completed: false,
    });

    await newPlan.save();
});

afterEach(async () => {
    await Plan.collection.drop();
});

test("Get a specified Plan successfully", async () => {
    const fromDb = await Plan.find({ _id: testId });
    expect(fromDb).toBeTruthy();
});

test("Create and get a second specified Plan successfully", async () => {
    const mockStudent = {
        _id: mongoose.Types.ObjectId(),
        name: "A fake person",
        id: "123871510343",
        upi: "fake723",
        yearLevel: ["SS"],
        plans: [],
    };
    const mockCourseAllocation = {
        _id: testId3,
        course: "Course",
        note: "this is a note",
        year: 2,
        semester: "S1",
    };
    const mockProgrammeDegree = {
        _id: mongoose.Types.ObjectId(),
        name: "BE (Hons) SE 2020",
        regulations: [],
        defaultPlan: null,
    };
    const newPlan = new Plan({
        _id: testId2,
        name: "new plan",
        student: mockStudent,
        courseAllocations: [mockCourseAllocation],
        programmeDegree: new ProgrammeDegree(),
        startYear: 2019,
        numYears: 2030,
        completed: false,
    });

    await newPlan.save();

    const fromDb = await Plan.find({ _id: testId2 });
    expect(fromDb).toBeTruthy();
    expect(fromDb[0].name).toBe("new plan");
});

test("Delete Plan from the database", async () => {
    await Plan.findByIdAndDelete(testId);
    const dbResponse = await Plan.find({ _id: testId });

    expect(dbResponse[0]).toBe(undefined);
});
