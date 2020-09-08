const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Course = require("../../src/models/course");
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

const newCourseRegulation = {
    _id: "56cb91bdc3464f14678934ca",
    type: "TEXT",
    points: 30,
    courses: ["SOFTENG111"],
};

describe("DELETE /course/:courseCode", () => {
    it("should delete a course given the courseCode", async (done) => {
        const course = new Course({
            name: "Software Engineering Theory",
            courseCode: "SOFTENG701",
            points: 15,
            semester: ["SS"],
            prerequisites: [newCourseRegulation],
            corequisites: [newCourseRegulation],
            restrictions: ["TESTCOURSE123"],
            informalEquivalents: [],
            description: "Theory of engineering",
        });
        course.save((err, courseRes) => {
            request(app)
                .delete("/course/SOFTENG701")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(courseRes._id.toString());
                    done();
                });
        });
    });
    it("should give 404 error if the courseCode does not exist when deleting", async (done) => {
        request(app)
            .delete("/course/fakeCourseCode")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("PUT /course", () => {
    it("should update a course correctly", async (done) => {
        const course = new Course({
            name: "Software Engineering Theory",
            courseCode: "SOFTENG701",
            points: 15,
            semester: ["SS"],
            prerequisites: [newCourseRegulation],
            corequisites: [newCourseRegulation],
            restrictions: ["TESTCOURSE123"],
            informalEquivalents: [],
            description: "Theory of engineering",
        });
        course.save((err, courseRes) => {
            request(app)
                .put("/course")
                .type("json")
                .send({
                    name: "Software Engineering Theory",
                    courseCode: "SOFTENG701",
                    points: 20,
                    semester: ["SS"],
                    prerequisites: [newCourseRegulation],
                    corequisites: [newCourseRegulation],
                    restrictions: ["TESTCOURSE123"],
                    informalEquivalents: [],
                    description: "Theory of engineering",
                })
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.points).toEqual(20);
                    expect(res.body._id.toString()).toEqual(courseRes._id.toString());
                    done();
                });
        });
    });
});

describe("/GET course", () => {
    it("can successfully get all courses", async (done) => {
        const course = new Course({
            name: "Software Engineering Theory",
            courseCode: "SOFTENG701",
            points: 15,
            semester: ["SS"],
            prerequisites: [newCourseRegulation],
            corequisites: [newCourseRegulation],
            restrictions: ["TESTCOURSE123"],
            informalEquivalents: [],
            description: "Theory of engineering",
        });
        course.save((err, courseRes) => {
            request(app)
                .get("/course")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveLength(1);
                    done();
                });
        });
    });
    it("can successfully get a single course by id", async (done) => {
        const course = new Course({
            name: "Software Engineering Theory",
            courseCode: "SOFTENG701",
            points: 15,
            semester: ["SS"],
            prerequisites: [newCourseRegulation],
            corequisites: [newCourseRegulation],
            restrictions: ["TESTCOURSE123"],
            informalEquivalents: [],
            description: "Theory of engineering",
        });
        course.save((err, courseRes) => {
            request(app)
                .get("/course/SOFTENG701")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(courseRes._id.toString());
                    done();
                });
        });
    });
    it("should return 404 if no course is found", async (done) => {
        request(app)
            .get("/course/SOFTENG701")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("/POST course", () => {
    it("can successfully POST a course", async (done) => {
        request(app)
            .post("/course")
            .type("json")
            .send({
                name: "Software Engineering Theory",
                courseCode: "SOFTENG701",
                points: 15,
                semester: ["SS"],
                prerequisites: [newCourseRegulation],
                corequisites: [newCourseRegulation],
                restrictions: ["TESTCOURSE123"],
                informalEquivalents: [],
                description: "Theory of engineering",
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty("name", "Software Engineering Theory");
                expect(res.body).toHaveProperty("courseCode", "SOFTENG701");
                expect(res.body).toHaveProperty("points", 15);
                expect(res.body).toHaveProperty("semester", ["SS"]);
                expect(res.body).toHaveProperty("prerequisites", [newCourseRegulation]);
                expect(res.body).toHaveProperty("corequisites", [newCourseRegulation]);
                expect(res.body).toHaveProperty("restrictions", ["TESTCOURSE123"]);
                expect(res.body).toHaveProperty("informalEquivalents", []);
                expect(res.body).toHaveProperty("description", "Theory of engineering");
                done();
            });
    });

    it("should not POST a course without name field", async (done) => {
        request(app)
            .post("/course")
            .type("json")
            .send({
                courseCode: "SOFTENG750",
                points: 15,
                semester: ["SS"],
                prerequisites: [newCourseRegulation],
                corequisites: [newCourseRegulation],
                restrictions: ["TESTCOURSE123"],
                informalEquivalents: [],
                description: "Theory of engineering",
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Course validation failed: name: Path `name` is required." });
                done();
            });
    });
    it("should not POST a course without courseCode field", async (done) => {
        request(app)
            .post("/course")
            .type("json")
            .send({
                name: "Big Databases",
                points: 15,
                semester: ["SS"],
                prerequisites: [newCourseRegulation],
                corequisites: [newCourseRegulation],
                restrictions: ["TESTCOURSE123"],
                informalEquivalents: [],
                description: "Theory of engineering",
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Course validation failed: courseCode: Path `courseCode` is required." });
                done();
            });
    });
    it("should not POST a course without points field", async (done) => {
        request(app)
            .post("/course")
            .type("json")
            .send({
                name: "Small Databases",
                courseCode: "SOFTENG711",
                semester: ["SS"],
                prerequisites: [newCourseRegulation],
                corequisites: [newCourseRegulation],
                restrictions: ["TESTCOURSE123"],
                informalEquivalents: [],
                description: "Theory of engineering",
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({ msg: "Course validation failed: points: Path `points` is required." });
                done();
            });
    });
});
