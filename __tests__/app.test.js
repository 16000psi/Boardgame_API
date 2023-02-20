const request = require("supertest");
const app = require("./../app");
const db = require("./../db/connection");
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data/index.js");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("Incorrect GET request / 404", () => {
    test("responds with a 404 error if endpoint does not exist", () => {
        return request(app)
        .get("/api/thisdoesnotexist")
        .expect(404)
    } )
})

describe("GET /api/categories", () => {
    test("responds with a 200 code and an array", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray (body)).toBeTruthy()
        })
    })
    test("Array should contain objects with slug and description keys", () => {
        return request(app)
        .get("/api/categories")
        .then(({body}) => {
            for (let i in body) {
                expect(body[i].hasOwnProperty("slug")).toBeTruthy()
                expect(body[i].hasOwnProperty("description")).toBeTruthy()
                expect(Object.keys(body[i]).length).toBe(2)
            }
        })
    })
})
