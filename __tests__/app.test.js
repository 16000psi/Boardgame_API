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
    test("responds with a 200 code and an object with a property of categories which is an array", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray (body.categories)).toBeTruthy()
        })
    })
    test("Array should contain correct ammount of objects with slug and description keys", () => {
        return request(app)
        .get("/api/categories")
        .then(({body}) => {
            expect(body.categories.length).toBe(4)
            for (let i in body.categories) {
                expect(body.categories[i].hasOwnProperty("slug")).toBeTruthy()
                expect(body.categories[i].hasOwnProperty("description")).toBeTruthy()
                expect(Object.keys(body.categories[i]).length).toBe(2)
            }
        })
    })
})

describe("GET /api/reviews", () => {
    test("responds with a 200 code and an object with a property of reviews which is an object", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(typeof body.reviews).toBe("object")
        })
    })
    // test("Array should contain correct ammount of objects with slug and description keys", () => {
    //     return request(app)
    //     .get("/api/categories")
    //     .then(({body}) => {
    //         expect(body.categories.length).toBe(4)
    //         for (let i in body.categories) {
    //             expect(body.categories[i].hasOwnProperty("slug")).toBeTruthy()
    //             expect(body.categories[i].hasOwnProperty("description")).toBeTruthy()
    //             expect(Object.keys(body.categories[i]).length).toBe(2)
    //         }
    //     })
    // })
})
