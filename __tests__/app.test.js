const request = require("supertest");
const app = require("./../app");
const db = require("./../db/connection");
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data/index.js");


console.log(testData)


afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("test", () => {
    test("ggg", () => {
        expect(1).toBe(1)
    })
})