const request = require("supertest");
const app = require("./../app");
const db = require("./../db/connection");
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data/index.js");
require ("jest-sorted")

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
    test("responds with a 200 code and an object with a property of reviews which is an array", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray (body.reviews)).toBeTruthy()
            
        })
    })
    test("Array should contain correct ammount of objects with correct properties", () => {
        return request(app)
        .get("/api/reviews")
        .then(({body}) => {
            const {reviews} = body
            expect(reviews.length).toBe(13)
            reviews.forEach((review) => {
                expect(review).toMatchObject({
                    owner: expect.any(String),
                    title: expect.any(String),
                    review_id: expect.any(Number),
                    category: expect.any(String),
                    review_img_url: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    designer: expect.any(String),
                    comment_count: expect.any(Number)

                })
            })

        })
    })
    test("Review comment_count property should be correct count of comments referencing that review's review id", () => {
        return request(app)
        .get("/api/reviews")
        .then(({body}) => {
            const {reviews} = body

            for (let i in reviews) {
                if (reviews[i].review_id === 2) {
                    expect(reviews[i].comment_count).toBe(3)
                }
                else if (reviews[i].review_id === 1) {
                    expect (reviews[i].comment_count).toBe(0)
                }
            }

        })
    })
    test("Reviews should be sorted by descending date order", () => {
        return request(app)
        .get("/api/reviews")
        .then(({body}) => {
            const {reviews} = body
            expect(reviews).toBeSortedBy("created_at", {descending:true})


        })
    })
})
