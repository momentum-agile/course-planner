const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Student = require("../../src/models/student");
const app = require("../../src/index");
const request = require("supertest");

process.env.NODE_ENV = "test";
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

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany();
    }
});

afterAll(async () => {
    mongoose.connection.close();
    app.close();
    await mongod.stop();
});

describe("/GET student", () => {
    it("can successfully get all students", async (done) => {
        const student = new Student({
            name: "John Doe",
            id: "1234567890",
            upi: "jdoe123",
            yearLevel: 2,
            plans: [],
        });
        student.save((err, studentRes) => {
            request(app)
                .get("/student")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveLength(1);
                    done();
                });
        });
    });
    it("can successfully get a student by _id", async (done) => {
        const student = new Student({
            name: "John Doe",
            id: "1234567890",
            _id: "abcdef012345678912345678",
            upi: "jdoe123",
            yearLevel: 2,
            plans: [],
        });
        student.save((err, studentRes) => {
            request(app)
                .get("/student/id/abcdef012345678912345678")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(studentRes._id.toString());
                    done();
                });
        });
    });
    it("can successfully get a student by id", async (done) => {
        const student = new Student({
            name: "John Doe",
            id: "1234567890",
            upi: "jdoe123",
            yearLevel: 2,
            plans: [],
        });
        student.save((err, studentRes) => {
            request(app)
                .get("/student/jdoe123")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(studentRes._id.toString());
                    done();
                });
        });
    });
    it("should return 404 if no student is found", async (done) => {
        request(app)
            .get("/student/fakeUpi")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("DELETE /student/:upi", () => {
    it("should delete a student given their upi", async (done) => {
        const student = new Student({
            name: "John Doe",
            id: "1234567890",
            upi: "jdoe123",
            yearLevel: 2,
            plans: [],
        });
        student.save((err, studentRes) => {
            request(app)
                .delete("/student/jdoe123")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(studentRes._id.toString());
                    done();
                });
        });
    });

    it("should give 404 error if the upi does not exist when deleting", async (done) => {
        request(app)
            .delete("/student/fakeUpi")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("PUT /student", () => {
    it("should update a course correctly", async (done) => {
        const student = new Student({
            _id: "5f58655a5bf4944afca0e69d",
            name: "John Doe",
            id: "1234567890",
            upi: "jdoe123",
            yearLevel: 2,
            plans: [],
        });
        student.save((err, studentRes) => {
            request(app)
                .put("/student")
                .type("json")
                .send({
                    _id: "5f58655a5bf4944afca0e69d",
                    name: "John Doe",
                    id: "1234567890",
                    upi: "jdoe123",
                    yearLevel: 3,
                    plans: [],
                })
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.yearLevel).toEqual(3);
                    expect(res.body._id.toString()).toEqual(studentRes._id.toString());
                    done();
                });
        });
    });
});

describe("/POST student", () => {
    it("can successfully create a student", async (done) => {
        request(app)
            .post("/student")
            .type("json")
            .send({
                name: "John Doe",
                id: "987",
                upi: "jdoe321",
                yearLevel: 2,
                plans: [],
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty("name", "John Doe");
                expect(res.body).toHaveProperty("id", "987");
                expect(res.body).toHaveProperty("upi", "jdoe321");
                expect(res.body).toHaveProperty("yearLevel", 2);
                expect(res.body).toHaveProperty("plans", []);
                done();
            });
    });

    it("should not create a student without name field", async (done) => {
        request(app)
            .post("/student")
            .type("json")
            .send({
                id: "9876",
                upi: "jdoe329",
                yearLevel: 2,
                plans: [],
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Student validation failed: name: Path `name` is required." });
                done();
            });
    });

    it("should not create a course without upi field", async (done) => {
        request(app)
            .post("/student")
            .type("json")
            .send({
                name: "John Doe",
                id: "9876",
                yearLevel: 2,
                plans: [],
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Student validation failed: upi: Path `upi` is required." });
                done();
            });
    });

    it("should not create a student without id field", async (done) => {
        request(app)
            .post("/student")
            .type("json")
            .send({
                name: "John Doe",
                upi: "jdoe329",
                yearLevel: 2,
                plans: [],
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Student validation failed: id: Path `id` is required." });
                done();
            });
    });
});
