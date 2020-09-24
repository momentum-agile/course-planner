const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const Plan = require("../../src/models/plan");
const Student = require("../../src/models/student");
const ProgrammeDegree = require("../../src/models/programme-degree");
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

const newRegulation = {
    _id: "56cb91bdc3464f14678934ca",
    points: 90,
    pointRequirement: "UPTO",
    courses: [],
};

const mockPlan = {
    name: "mockPlan",
};

const programmeDegree = new ProgrammeDegree({
    name: "Be Hons Software Engineering",
    regulations: [newRegulation],
    defaultPlan: mockPlan,
});

const generatePlan = () =>
    new Plan({
        name: "BobsPlan",
        student: "56cb91bdc3464f14678934cb",
        programmeDegree: "56cb91bdc3464f14678934cc",
        startYear: 2020,
        numYears: 2024,
        completed: false,
    });

const generateStudent = () =>
    new Student({
        _id: mongoose.Types.ObjectId(),
        name: "A fake person",
        id: "123871510343",
        upi: "fake723",
        yearLevel: 4,
    })

const generateProgramme = () =>
    new ProgrammeDegree({
        name: "Be Hons Software Engineering",
        regulations: [newRegulation],
    })

describe("DELETE /plan/:id", () => {
    it("should delete a plan given the name", async (done) => {
        const plan = generatePlan();
        plan.save((err, planRes) => {
            request(app)
                .delete(`/plan/${plan._id}`)
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(planRes._id.toString());
                    done();
                });
        });
    });
    it("should give 404 error if the id does not exist when deleting", async (done) => {
        request(app)
            .delete(`/plan/${mongoose.Types.ObjectId()}`)
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("PUT /plan", () => {
    it("should update a plan correctly", async (done) => {
        const plan = generatePlan();
        plan.save((err, planRes) => {
            request(app)
                .put("/plan")
                .type("json")
                .send({
                    _id: plan._id,
                    name: "BobsPlan",
                    student: "56cb91bdc3464f14678934cb",
                    programmeDegree: "56cb91bdc3464f14678934cc",
                    startYear: 2019,
                    numYears: 2024,
                    completed: false,
                })
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.startYear).toEqual(2019);
                    expect(res.body._id.toString()).toEqual(planRes._id.toString());
                    done();
                });
        });
    });
});

describe("/GET plan", () => {
    it("can successfully get all plans", async (done) => {
        const plan = generatePlan();
        plan.save((err, planRes) => {
            request(app)
                .get("/plan")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveLength(1);
                    done();
                });
        });
    });
    it("can successfully get a single plan by id", async (done) => {
        const plan = generatePlan();
        plan.save((err, planRes) => {
            request(app)
                .get(`/plan/${plan._id}`)
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(planRes._id.toString());
                    done();
                });
        });
    });
    it("should return 404 if no plan is found", async (done) => {
        request(app)
            .get(`/plan/${mongoose.Types.ObjectId()}`)
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("/POST plan", () => {
    it("can successfully POST a plan for a student", async (done) => {
        const student = generateStudent()
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send(generatePlan())
                .end((err, res) => {
                    expect(res.statusCode).toBe(201);
                    expect(res.body).toHaveProperty("name", "BobsPlan");
                    expect(res.body).toHaveProperty("programmeDegree", "56cb91bdc3464f14678934cc");
                    expect(res.body).toHaveProperty("startYear", 2020);
                    expect(res.body).toHaveProperty("numYears", 2024);
                    expect(res.body).toHaveProperty("completed", false);
                    request(app)
                        .get(`/student/${student.upi}`)
                        .type("json")
                        .end((_err, studentRes) => {
                            expect(studentRes.statusCode).toBe(200);
                            expect(studentRes.body).toHaveProperty("plans", [res.body._id]);
                            done();
                        });
                });

        })
    });

    it("can successfully POST a plan for a student with plans", async (done) => {
        const student = generateStudent()
        const newPlanId = "534f6d6520706c616e206964"
        student.plans = [newPlanId]
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send(generatePlan())
                .end((err, res) => {
                    expect(res.statusCode).toBe(201);
                    expect(res.body).toHaveProperty("name", "BobsPlan");
                    expect(res.body).toHaveProperty("programmeDegree", "56cb91bdc3464f14678934cc");
                    expect(res.body).toHaveProperty("startYear", 2020);
                    expect(res.body).toHaveProperty("numYears", 2024);
                    expect(res.body).toHaveProperty("completed", false);
                    request(app)
                        .get(`/student/${student.upi}`)
                        .type("json")
                        .end((_err, studentRes) => {
                            expect(studentRes.statusCode).toBe(200);
                            expect(studentRes.body).toHaveProperty("plans", [newPlanId,res.body._id]);
                            done();
                        });
                });

        })
    });
    it("can successfully POST a plan for a programme", async (done) => {
        const programme = generateProgramme()
        programme.save((err, planRes) => {
            request(app)
                .post(`/plan/programmedegree/${programme._id}`)
                .type("json")
                .send(generatePlan())
                .end((err, res) => {
                    expect(res.statusCode).toBe(201);
                    expect(res.body).toHaveProperty("name", "BobsPlan");
                    expect(res.body).toHaveProperty("programmeDegree", "56cb91bdc3464f14678934cc");
                    expect(res.body).toHaveProperty("startYear", 2020);
                    expect(res.body).toHaveProperty("numYears", 2024);
                    expect(res.body).toHaveProperty("completed", false);
                    request(app)
                        .get(`/programmedegree/${programme._id}`)
                        .type("json")
                        .end((_err, programmeRes) => {
                            expect(programmeRes.statusCode).toBe(200);
                            expect(programmeRes.body).toHaveProperty("defaultPlan", res.body._id);
                            done();
                        });
                });

        })
    });

    it("should not POST a plan without programmeDegree field", async (done) => {
        const student = generateStudent()
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send({
                    name: "BobsPlan",
                    student: "56cb91bdc3464f14678934cb",
                    startYear: 2020,
                    numYears: 2024,
                    completed: false,
                })
                .end((err, res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toMatchObject({msg: "Plan validation failed: programmeDegree: Path `programmeDegree` is required."});
                    done();
                });
        });
    });
    it("should not POST a plan without startYear field", async (done) => {
        const student = generateStudent()
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send({
                    name: "BobsPlan",
                    student: "56cb91bdc3464f14678934cb",
                    programmeDegree: "56cb91bdc3464f14678934cc",
                    numYears: 2024,
                    completed: false,
                })
                .end((err, res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toMatchObject({msg: "Plan validation failed: startYear: Path `startYear` is required."});
                    done();
                });
        });
    });
    it("should not POST a plan without numYears field", async (done) => {
        const student = generateStudent()
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send({
                    name: "BobsPlan",
                    student: "56cb91bdc3464f14678934cb",
                    programmeDegree: "56cb91bdc3464f14678934cc",
                    startYear: 2020,
                    completed: false,
                })
                .end((err, res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toMatchObject({msg: "Plan validation failed: numYears: Path `numYears` is required."});
                    done();
                });
        });
    });

    it("should not POST a plan without completed field", async (done) => {
        const student = generateStudent()
        student.save((err, planRes) => {
            request(app)
                .post(`/plan/student/${student.upi}`)
                .type("json")
                .send({
                    name: "BobsPlan",
                    student: "56cb91bdc3464f14678934cb",
                    programmeDegree: "56cb91bdc3464f14678934cc",
                    startYear: 2020,
                    numYears: 2024,
                })
                .end((err, res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toMatchObject({msg: "Plan validation failed: completed: Path `completed` is required."});
                    done();
                });
        });
    });
});
