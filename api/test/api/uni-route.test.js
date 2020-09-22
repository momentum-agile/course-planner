const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");
const uniRoute = require("../../src/routes/uni-api-route");
const uni = require("../../src/uni-service");

const UNI_API_DATA = { course: "SOFTENG 750", desc: "fun course" };
const mockFetchAllCourses = jest.spyOn(uni, "fetchAllCourses").mockImplementation(() => UNI_API_DATA);
const mockFetchParticularCourse = jest.spyOn(uni, "fetchParticularCourse").mockImplementation(() => UNI_API_DATA);
let server;

beforeAll(async (done) => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/uni", uniRoute);
    server = app.listen(8081, () => done());
});

afterAll((done) => {
    server.close(async () => {
        done();
    });
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("GET /uni/course", () => {
    it("checks the correct functions are called when the request is given", () => {
        jest.setTimeout(async (done) => {
            const resp = await fetch("http://localhost:8081/uni/course?subject=SOFTENG&courseNbr=750&year=2021", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const respJson = await resp.json();

            expect(resp.status).toBe(200);
            expect(mockFetchParticularCourse).toBeCalledTimes(1);
            expect(respJson).toEqual(UNI_API_DATA);
            done();
        }, 10000);
    });
});

describe("GET /uni/programme", () => {
    it("checks the correct functions are called when the request is given", () => {
        jest.setTimeout(async (done) => {
            const resp = await fetch("http://localhost:8081/uni/programme?subject=SOFTENG&year=2021", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            expect(resp.status).toBe(204);
            expect(mockFetchAllCourses).toBeCalledTimes(1);
            done();
        }, 10000);
    });
});
