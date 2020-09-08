const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Student = require("../../src/models/student");

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
    const newStudent = new Student({
        name: "John Doe",
        id: "1234567890",
        upi: "jdoe123",
        yearLevel: 2,
        plans: [],
    });

    await newStudent.save();
});

afterEach(async () => {
    await Student.collection.drop();
});

test("Get a specified Student successfully", async () => {
    const fromDb = await Student.find({ id: 1234567890 });
    expect(fromDb).toBeTruthy();
});

test("Create and get a second specified Student successfully", async () => {
    const newStudent = new Student({
        name: "John Smith",
        id: "9876543210",
        upi: "jsmi123",
        yearLevel: 2,
        plans: [],
    });

    await newStudent.save();

    const fromDb = await Student.find({ id: 9876543210 });

    expect(fromDb).toBeTruthy();
    expect(fromDb[0].name).toBe("John Smith");
    expect(fromDb[0].upi).toBe("jsmi123");
});

test("Delete Student from the database", async () => {
    await Student.findOneAndDelete({ id: 1234567890 });
    const dbResponse = await Student.find({ id: 1234567890 });
    expect(dbResponse[0]).toBe(undefined);
});
