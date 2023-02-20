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

describe("test", () => {
    test("ggg", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual({msg: "yep"})
        })
    })
})