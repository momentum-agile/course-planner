
jest.mock("node-fetch");
const fetch = require("node-fetch");
const uni = require("../src/uni-service");

const JSON_MOCK_VALUE = { course: "SOFTENG 999", desc: "fake course" }; // Mock data for json() method to return
const courseURL = "https://api.auckland.ac.nz/service/courses/v2/courses"

beforeEach(() => {
    // Reset the mock to prevent tests affecting each other
    fetch.mockClear();

    // Mock the async json() call (for the data returned by fetch())
    const mockJsonPromise = Promise.resolve(JSON_MOCK_VALUE);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    fetch.mockImplementation(() => mockFetchPromise);
});

describe("test uni services", () => {
    it("calls the right endpoint to get all courses for a programme", async () => {
        // Set up dummy input data
        const subject = "SOFTENG";
        const year = "2021";
        const data = await uni.fetchAllCourses(subject, year);
        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toBe(courseURL + `?size=200&subject=${subject}&year=${year}`);
        expect(fetch.mock.calls[0][1].method).toBe("GET");
        expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
        expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");
        expect(data).toBe(JSON_MOCK_VALUE);
    });

    it("calls the right endpoint to get a courses for a catalogNbr", async () => {
        // Set up dummy input data
        const subject = "SOFTENG";
        const catalogNbr = "750";
        const year = "2021";
        const data = await uni.fetchParticularCourse(subject, catalogNbr, year);
        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toBe(courseURL + `?size=200&subject=${subject}&year=${year}&catalogNbr=${catalogNbr}`);
        expect(fetch.mock.calls[0][1].method).toBe("GET");
        expect(fetch.mock.calls[0][1].headers.Accept).toBe("application/json");
        expect(fetch.mock.calls[0][1].headers["Content-Type"]).toBe("application/json");
        expect(data).toBe(JSON_MOCK_VALUE);
    });
});