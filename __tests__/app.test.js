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

describe("Incorrect request / 404", () => {
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

describe("GET /api/reviews/:review_id", () => {
    test("Responds with a 200 code and an object with a property of review which contains an object", () => {
        return request(app)
        .get("/api/reviews/5")
        .expect(200)
        .then(({body}) => {
            expect(body.hasOwnProperty("review")).toBeTruthy()
            expect(typeof body.review).toBe("object")
            
        })
    })
    test("Returned review object has correct properties", () => {
        return request(app)
        .get("/api/reviews/5")
        .expect(200)
        .then(({body}) => {
            const {review} = body
            expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                review_body: expect.any(String)

            })
            expect(Object.keys(review).length).toBe(9)
            expect(review.review_id).toBe(5)
        })
    })
    test("Responds with 404 error if specified review ID does not exist" , () => {
        return request(app)
        .get("/api/reviews/5000")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})
        })
    })
})

describe("GET /api/reviews/:review_id/comments", () => {
    test("Responds with 200 status and object containing array of comments" , () => {
        return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray (body.comments)).toBeTruthy()

        })

    })
    test("Returned comments should have the correct keys", () => {
        return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({body}) => {
            const {comments} = body
            comments.forEach((comment) => {
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: expect.any(String),
                review_id: expect.any(Number),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
            })
            expect(comment.review_id).toBe(3)
            expect(Object.keys(comment).length).toBe(6)
            })
        })
    })

    test("Returned comments should be in descending date order", () => {
        return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then(({body}) => {
            const {comments} = body
            expect(comments).toBeSortedBy("created_at", {descending:true})
        })
    })
    test("Returns 200 and empty array in comments if there are no comments for the review", () => {
        return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then(({body}) => {
            const {comments} = body
            expect(comments).toEqual([])

        })

    })

    test("Responds with 404 status if review_id does not contain a review" , () => {
        return request(app)
        .get("/api/reviews/5000/comments")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})

        })


    })
})

describe("POST /api/reviews/:review_id/comments", () => {
    test("Responds with 201 and a comment object", () => {
        const newComment = {
            username: "philippaclaire9",
            body: "Wow! What a FANTASTIC api!!"
        }
        return request(app)
        .post("/api/reviews/1/comments")
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            const {comment} = body
            expect(typeof comment).toBe("object")
        })
    })
    test("Returned comment must have the correct keys", () => {
        const newComment = {
            username: "philippaclaire9",
            body: "Wow! What a FANTASTIC api!!"
        }
        return request(app)
        .post("/api/reviews/1/comments")
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            const {comment} = body
            expect(comment).toMatchObject({
                body: "Wow! What a FANTASTIC api!!",
                author: "philippaclaire9",
                comment_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
                review_id: expect.any(Number)


            })
            
        })
    })
    test("Ignores extra comment properties and returns successfully", () => {
        const newComment = {
            username: "philippaclaire9",
            body: "Let me start by thanking you for such a lovely opportunity to comment.",
            body2: "Would you believe its been some time since i used this website",
            body3: "And back in my day things worked a little differently.",
        }
        return request(app)
        .post("/api/reviews/1/comments")
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            const {comment} = body
            expect(Object.keys(comment).length).toBe(6)
            expect(comment).toMatchObject({
                body: "Let me start by thanking you for such a lovely opportunity to comment.",
                author: "philippaclaire9",
                comment_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
                review_id: expect.any(Number)


            })
            
        })
    })
    test("Responds with 404 error if specified review ID does not exist" , () => {
        return request(app)
        .post("/api/reviews/5555/comments")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})

        })

    })
    test("Responds with 400 error if specified username does not exist" , () => {
        const newComment = {
            username: "suspiciousPerson1982",
            body: "Hahah! Ur website sux"
        }
        return request(app)
        .post("/api/reviews/1/comments")
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Username does not exist."})

        })

    })
    test("Responds with 400 error if request object incomplete" , () => {
        const newComment = {
            username: "dodgyRouter2k20"
        }
        return request(app)
        .post("/api/reviews/1/comments")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })

    })
    test("Responds with 400 error if specified review ID is not a number" , () => {
        const newComment = {
            username: "dumguy49",
            body: "uhhhh how internet work??"
        }
        return request(app)
        .post("/api/reviews/ddddd/comments")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})

        })

    })

})


describe ("GET /api/users", () => {
    test("Returns with status 200 and an array of users", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body}) => {
            console.log(body.users)
            expect(Array.isArray (body.users)).toBeTruthy()
        })
    })
    test("Array should contain correct ammount of objects with the correct keys", () => {
        return request(app)
        .get("/api/users")
        .then(({body}) => {
            const {users} = body
            expect(users.length).toBe(4)
            users.forEach((user) => {
                expect(user).toMatchObject ({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)

                })
                expect(Object.keys(user).length).toBe(3)
            })

        })
    })
})

describe("PATCH /api/reviews/:review_id", () => {
    test("Responds with 202 status and review object when given a valid request", () =>{
        const votesObject = {
            inc_votes: -1
        }
        return request(app)
        .patch("/api/reviews/4")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {review} = body
            expect(typeof review).toBe("object")

        })
    })
    test("Returned review object has correct properties", () => {
        const votesObject = {
            inc_votes: -1
        }
        return request(app)
        .patch("/api/reviews/4")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {review} = body
            expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                review_body: expect.any(String)

            })
            expect(Object.keys(review).length).toBe(9)
            expect(review.review_id).toBe(4)
        })
    })
    test("Updated review should have the correctly adjusted vote property", () =>{
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/reviews/1")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {review} = body
            expect(review.votes).toBe(2)

        })

    })
    test("Updated review should have the correctly adjusted vote property", () => {
        const votesObject2 = {
            inc_votes: -2
        }
        return request(app)
        .patch("/api/reviews/6")
        .send(votesObject2)
        .expect(202)
        .then(({body}) => {
            const {review} = body
            expect(review.votes).toBe(6)

        })
    })
    test("Ignores extra properties on request object and returns succesfully", () => {
        const votesObject = {
            inc_votes: -1,
            bleep: "bloop",
            howManyVotesDoIlikeToSee : 0

        }
        return request(app)
        .patch("/api/reviews/4")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {review} = body
            expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                review_body: expect.any(String)

            })
            expect(Object.keys(review).length).toBe(9)
            expect(review.review_id).toBe(4)
        })
    })
    test("Responds with 404 status if review_id does not contain a review" , () => {
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/reviews/1735735")
        .send(votesObject)
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})

        })
    })
    test("Responds with 400 error if specified review ID is not a number" , () => {
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/reviews/dshgsdghs")
        .send(votesObject)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})

        })

    })
    test("Responds with 400 error if request object incomplete" , () => {
        const votesObject = {

        }
        return request(app)
        .patch("/api/reviews/5")
        .send(votesObject)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })

    })
})

