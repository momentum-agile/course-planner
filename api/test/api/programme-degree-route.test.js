const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
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

describe("/GET programmedegree", () => {
    it("should successfully get all programme degrees", async (done) => {
        const programmeDegree = new ProgrammeDegree({
            name: "Be Hons Software Engineering",
            regulations: [newRegulation],
            defaultPlan: null,
        });
        programmeDegree.save((err, programmeRes) => {
            request(app)
                .get("/programmedegree")
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveLength(1);
                    done();
                });
        });
    });
    it("can successfully get a single programme degree by id", async (done) => {
        const programmeDegree = new ProgrammeDegree({
            name: "Be Hons Software Engineering",
            regulations: [newRegulation],
            defaultPlan: null,
        });
        programmeDegree.save((err, programmeRes) => {
            request(app)
                .get("/programmedegree/" + programmeRes.id)
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(programmeDegree._id.toString());
                    done();
                });
        });
    });
    it("should return 404 if no programme degree is found", async (done) => {
        request(app)
            .get("/programmedegree/" + "56cb91bdc3464f14678934ca")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("/POST programme-degree", () => {
    it("can successfully POST a programme-degree", async (done) => {
        request(app)
            .post("/programmedegree")
            .type("json")
            .send({
                name: "Be Hons Software Engineering",
                regulations: [newRegulation],
                defaultPlan: null,
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty("name", "Be Hons Software Engineering");
                expect(res.body).toHaveProperty("regulations", [newRegulation]);
                expect(res.body).toHaveProperty("defaultPlan", null);
                done();
            });
    });
    it("should not create a programme-degree without name field", async (done) => {
        request(app)
            .post("/programmedegree")
            .type("json")
            .send({
                regulations: [newRegulation],
                defaultPlan: null,
            })
            .end((err, res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toMatchObject({msg: "ProgrammeDegree validation failed: name: Path `name` is required."});
                done();
            });
    });
});

describe("DELETE /programmedegree/:id", () => {
    it("should delete a programme-degree given the id", async (done) => {
        const programmeDegree = new ProgrammeDegree({
            name: "Be Hons Software Engineering",
            regulations: [newRegulation],
            defaultPlan: null,
        });
        programmeDegree.save((err, programmeRes) => {
            request(app)
                .delete("/programmedegree/" + programmeRes._id)
                .type("json")
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body._id.toString()).toEqual(programmeRes._id.toString());
                    done();
                });
        });
    });
    it("should give 404 error if the programmedegree id does not exist when deleting", async (done) => {
        request(app)
            .delete("/programmedegree/" + "56cb91bdc3464f14678934ca")
            .type("json")
            .end((_err, res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });
});

describe("PUT /programmeDegree", () => {
    it("should update a programmeDegree correctly", async (done) => {
        const programmeDegree = new ProgrammeDegree({
            _id: "5f58655ad0d808069389c5be",
            name: "Be Hons Software Engineering",
            regulations: [newRegulation],
            defaultPlan: null,
        });
        programmeDegree.save((err, programmeRes) => {
            request(app)
                .put("/programmedegree/")
                .type("json")
                .send({
                    _id: "5f58655ad0d808069389c5be",
                    name: "updatedName",
                    regulations: [newRegulation],
                    defaultPlan: null,
                })
                .end((_err, res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.name).toEqual("updatedName");
                    expect(res.body._id.toString()).toEqual(programmeRes._id.toString());
                    done();
                });
        });
    });
});
