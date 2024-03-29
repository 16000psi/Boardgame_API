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
    test("Reviews should be sorted by descending date order by default", () => {
        return request(app)
        .get("/api/reviews")
        .then(({body}) => {
            const {reviews} = body
            expect(reviews).toBeSortedBy("created_at", {descending:true})


        })
    })
    test("Accepts categories query which limits result to single category", () => {
    return request(app)
    .get("/api/reviews?category=social_deduction")
    .expect(200)
    .then(({body}) => {
        const {reviews} = body
        reviews.forEach((review) => {
            expect(review.category).toBe("social deduction")
        })
        
    })
    })
    test("Category query that exists with no reviews returns 200 with an empty array.", () => {
        return request(app)
        .get("/api/reviews?category=children%27s_games")
        .expect(200)
        .then(({body}) => {
            const {reviews} = body
            expect(reviews.length).toBe(0)

            
        })
        })
    test("Incorrect category returns 404", () => {
        return request(app)
        .get("/api/reviews?category=social_deductiog")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})
           
            
        })
    })
    test("Accepts sort by query which sorts results by that column (default descending order)", () => {
        return request(app)
        .get("/api/reviews?sort_by=comment_count")
        .expect(200)
        .then(({body}) => {
            const {reviews} = body
            expect(reviews).toBeSortedBy("comment_count", {descending:true})
            
        })
        .then(() => {
            return request(app)
            .get("/api/reviews?sort_by=designer")
            .expect(200)
            .then(({body}) => {
                const {reviews} = body
                expect(reviews).toBeSortedBy("designer", {descending:true})
            
            })
        })
    })
    test("Invalid sort by query returns 400 error", () => {
        return request(app)
        .get("/api/reviews?sort_by=evilSqlHack")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
           
            
        })
    })
    test("Accepts sort order query which dictates whether results are in ascending or descending order", () => {
        return request(app)
        .get("/api/reviews?sort_by=review_id&order=ASC")
        .expect(200)
        .then(({body}) => {
            const {reviews} = body
            expect(reviews).toBeSortedBy("review_id", {ascending:true})
            
        })
        .then(() => {
            return request(app)
            .get("/api/reviews?sort_by=comment_count&order=ASC")
            .expect(200)
            .then(({body}) => {
                const {reviews} = body
                expect(reviews).toBeSortedBy("comment_count", {ascending:true})
            
            })
        })
    })
    test("Invalid order by query returns 400 error", () => {
        return request(app)
        .get("/api/reviews?order=stealDBBadStuff")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
           
        })
    })
    test("Accepts limit query which limits number of results", () => {
        return request(app)
        .get("/api/reviews?limit=2")
        .expect(200)
        .then(({body}) => {
            const {reviews} = body
            expect(reviews.length).toBe(2)

            
        })
    })
    test("Accepts page query which changes page of results if also using limit", () => {
        return request(app)
        .get("/api/reviews?limit=2&p=2")
        .expect(200)
        .then(({body}) => {
            const {reviews} = body
            expect(reviews.length).toBe(2)
            expect(reviews[0].review_id).toBe(12)
            expect(reviews[1].review_id).toBe(10)

            
        })
    })
    test("Returns 400 bad request if index query is not a number", () => {
        return request(app)
        .get("/api/reviews?limit=GRDPBeDamned&p=2")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg : "Bad request."})


            
        })
    })
    test("Returns 400 bad request if p query is not a number", () => {
        return request(app)
        .get("/api/reviews?limit=6&p=iAmHackinU")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg : "Bad request."})


            
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
    test("Returned review object has correct properties including comment count", () => {
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
                comment_count: expect.any(Number),
                designer: expect.any(String),
                review_body: expect.any(String)

            })
            expect(Object.keys(review).length).toBe(10)
            expect(review.review_id).toBe(5)
        })
    })
    test("Returned review object should have the correct comment count", () => {
        return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({body}) => {
            const {review} = body
            expect(review.comment_count).toBe(3)
            expect(review.review_id).toBe(2)
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
    test("Accepts limit query which limits the number of results" , () => {
        return request(app)
        .get("/api/reviews/3/comments?limit=2")
        .expect(200)
        .then(({body}) => {
            const {comments} = body
            expect(comments.length).toBe(2)

        })
    })
    test("Accepts p query which determines the page of results when used in conjunction with limit" , () => {
        return request(app)
        .get("/api/reviews/3/comments?limit=1&p=3")
        .expect(200)
        .then(({body}) => {
            const {comments} = body
            expect(comments[0].comment_id).toBe(2)

        })
    })
    test("Returns a 400 bad request if the limit query is not a number" , () => {
        return request(app)
        .get("/api/reviews/3/comments?limit=GimmeUrDB&p=3")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad request."})


        })
    })
    test("Returns a 400 bad request if the p query is not a number" , () => {
        return request(app)
        .get("/api/reviews/3/comments?limit=1&p=IstealCreditInfo")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({ msg: "Bad request."})


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
        .send(newComment)
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

describe("GET /api/users", () => {
    test("Returns with status 200 and an array of users", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body}) => {
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

describe("GET /api", () => {
    test("Responds with a server status 200 and an api json object", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            const api = body
            expect(typeof api).toBe("object")
        })

    })
    test("Returned api json object should have properties for each endpoint", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            const api = body
            console.log(api)
            const keys = Object.keys(api.api)
            expect(keys.includes("GET /api")).toBeTruthy()
            expect(keys.includes("GET /api/categories")).toBeTruthy()
            expect(keys.includes("GET /api/reviews")).toBeTruthy()
            expect(keys.includes("GET /api/reviews/:review_id")).toBeTruthy()
            expect(keys.includes("GET /api/users")).toBeTruthy()
            expect(keys.includes("GET /api/reviews/:review_id/comments")).toBeTruthy()
            expect(keys.includes("POST /api/reviews/:review_id/comments")).toBeTruthy()
            expect(keys.includes("PATCH /api/reviews/:review_id")).toBeTruthy()
            expect(keys.includes("DELETE /api/comments/:comment_id")).toBeTruthy()

        })

    })
})

describe("DELETE /api/comments/:comment_id", () => {
    test("responds with a 204 code if a comment has been successfully deleted", () => {
        return request(app)
        .delete("/api/comments/5")
        .expect(204)
    })
    test("responds with a 400 code if comment id parameter is not a number", () => {
        return request(app)
        .delete("/api/comments/stealythyEvilStealcardDetailsPlz")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
        })
    })
    test("responds with a 400 code if no comment exists in database with comment id", () => {
        return request(app)
        .delete("/api/comments/5000")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
        })
    })


})

describe("GET /api/users/:username", () => {
    test("Responds with a 200 code and an object with a property of user which contains an object", () => {
        return request(app)
        .get("/api/users/philippaclaire9")
        .expect(200)
        .then(({body}) => {
            expect(body.hasOwnProperty("user")).toBeTruthy()
            expect(typeof body.user).toBe("object")
            
        })
    })
    test("Returned user object has correct properties", () => {
        return request(app)
        .get("/api/users/philippaclaire9")
        .expect(200)
        .then(({body}) => {
            const {user} = body
            expect(user).toMatchObject({
                username: "philippaclaire9",
                avatar_url: expect.any(String),
                name: expect.any(String)
            })
            expect(Object.keys(user).length).toBe(3)
        })
    })
    test("Responds with 404 error if specified username does not exist" , () => {
        return request(app)
        .get("/api/users/cancelledThenFiredFromCompany")
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})
        })
    })
})

describe("PATCH /api/comments/:comment_id", () => {
    test("Responds with 202 status and comment object when given a valid request", () =>{
        const votesObject = {
            inc_votes: -1
        }
        return request(app)
        .patch("/api/comments/3")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {comment} = body
            expect(typeof comment).toBe("object")

        })
    })
    test("Returns comment object has correct properties", () => {
        const votesObject = {
            inc_votes: -1
        }
        return request(app)
        .patch("/api/comments/3")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {comment} = body
            expect(comment).toMatchObject({
                review_id: expect.any(Number),
                body: expect.any(String),
                comment_id: 3,
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String)
            })
            expect(Object.keys(comment).length).toBe(6)
        })
    })
    test("Updated comment should have the correctly adjusted vote property", () =>{
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/comments/1")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {comment} = body
            expect(comment.votes).toBe(17)

        })

    })
    test("Updated comment should have the correctly adjusted vote property", () => {
        const votesObject2 = {
            inc_votes: -2
        }
        return request(app)
        .patch("/api/comments/6")
        .send(votesObject2)
        .expect(202)
        .then(({body}) => {
            const {comment} = body
            expect(comment.votes).toBe(8)

        })
    })
    test("Ignores extra properties on request object and returns succesfully", () => {
        const votesObject = {
            inc_votes: -1,
            bleep: "bloop",
            howManyVotesDoIlikeToSee : 0

        }
        return request(app)
        .patch("/api/comments/6")
        .send(votesObject)
        .expect(202)
        .then(({body}) => {
            const {comment} = body
            expect(comment).toMatchObject({
                review_id: expect.any(Number),
                body: expect.any(String),
                comment_id: 6,
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String)

            })
            expect(Object.keys(comment).length).toBe(6)
        })
    })
    test("Responds with 404 status if comment_id does not contain a review" , () => {
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/comments/1735735")
        .send(votesObject)
        .expect(404)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item not found."})

        })
    })
    test("Responds with 400 error if specified comment ID is not a number" , () => {
        const votesObject = {
            inc_votes: 1
        }
        return request(app)
        .patch("/api/comments/dshgsdghs")
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
        .patch("/api/comments/5")
        .send(votesObject)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })

    })
})

describe("POST /api/reviews", () => {
    test("Responds with 201 and a review object", () => {
        const newReview = {
            review_body: "sucks",
            owner: "philippaclaire9",
            title: "i dont like boardgames",
            designer: "globocorp games",
            review_img_url: "blooop",
            category: "dexterity"
        }
        return request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201)
        .then(({body}) => {
            const {review} = body
            expect(typeof review).toBe("object")
        })
    })
    test("Returned review must have the correct keys", () => {
        const newReview = {
            review_body: "sucks",
            owner: "philippaclaire9",
            title: "i dont like boardgames",
            designer: "globocorp games",
            review_img_url: "blooop",
            category: "dexterity"
        }
        return request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201)
        .then(({body}) => {
            const {review} = body
            expect(review).toMatchObject({
                review_id: expect.any(Number),
                title: 'i dont like boardgames',
                category: 'dexterity',
                designer: 'globocorp games',
                owner: 'philippaclaire9',
                review_body: 'sucks',
                review_img_url: 'blooop',
                created_at: expect.any(String),
                votes: 0,
                comment_count: 0
            })
            expect(Object.keys(review).length).toBe(10)
            
        })
    })
    test("Ignores extra review properties and returns successfully", () => {
        const newReview = {
            username: "philippaclaire9",
            body: "Let me start by thanking you for such a lovely opportunity to comment.",
            body2: "Would you believe its been some time since i used this website",
            body3: "And back in my day things worked a little differently.",
            review_body: "sucks",
            owner: "philippaclaire9",
            title: "i dont like boardgames",
            designer: "globocorp games",
            review_img_url: "blooop",
            category: "dexterity"
        }
        return request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(201)
        .then(({body}) => {
            const {review} = body
            expect(review).toMatchObject({
                review_id: expect.any(Number),
                title: 'i dont like boardgames',
                category: 'dexterity',
                designer: 'globocorp games',
                owner: 'philippaclaire9',
                review_body: 'sucks',
                review_img_url: 'blooop',
                created_at: expect.any(String),
                votes: 0,
                comment_count: 0
            })
            expect(Object.keys(review).length).toBe(10)
            
        })
    })
    test("Responds with 400 error if specified username does not exist" , () => {
        const newReview = {
            review_body: "sucks",
            owner: "exemployeeloser",
            title: "i dont like boardgames",
            designer: "globocorp games",
            review_img_url: "blooop",
            category: "dexterity"
        }
        return request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Username does not exist."})

        })

    })
    test("Responds with 400 error if request object incomplete" , () => {
        const newReview = {
            username: "dodgyRouter2k20"
        }
        return request(app)
        .post("/api/reviews")
        .send(newReview)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })
    })
})

describe("POST /api/categories", () => {
    test("Responds with 201 and a category object", () => {
        const newCategory = {
            slug: "card gamez",
            description: "52 pickup!! hahah lol"
        }
        return request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect(201)
        .then(({body}) => {
            const {category} = body
            expect(typeof category).toBe("object")
        })
    })
    test("Returned comment must have the correct keys", () => {
        const newCategory = {
            slug: "card gamez",
            description: "52 pickup!! hahah lol"
        }
        return request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect(201)
        .then(({body}) => {
            const {category} = body
            expect(category).toMatchObject({
                slug: "card gamez",
                description: "52 pickup!! hahah lol"
            })
            expect(Object.keys(category).length).toBe(2)
            
        })
    })
    test("Ignores extra category properties and returns successfully", () => {
        const newCategory = {
            slug: "card gamez",
            description: "52 pickup!! hahah lol",
            username: "philippaclaire9",
            body: "Let me start by thanking you for such a lovely opportunity to comment.",
            body2: "Would you believe its been some time since i used this website",
            body3: "And back in my day things worked a little differently.",
        }
        return request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect(201)
        .then(({body}) => {
            const {category} = body
            expect(category).toMatchObject({
                slug: "card gamez",
                description: "52 pickup!! hahah lol"
            })
            expect(Object.keys(category).length).toBe(2)
            
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
    test("Responds with 400 error if specified category slug already exists" , () => {
        const newCategory = {
            slug: "dexterity",
            description: "quick agile nifty fingers haha! "
        }
        return request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Item already exists."})

        })

    })
    test("Responds with 400 error if request object incomplete" , () => {
        const newCategory = {
            username: "dodgyRouter2k20"
        }
        return request(app)
        .post("/api/categories")
        .send(newCategory)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })
    })
})

describe("DELETE /api/reviews", () => {
    test("responds with a 204 code if a comment has been successfully deleted", () => {
        return request(app)
        .delete("/api/reviews/1")
        .expect(204)
    })
    test("responds with a 400 code if review id parameter is not a number", () => {
        return request(app)
        .delete("/api/reviews/1stealythyEvilStealcardDetailsPlz")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
        })
    })
    test("responds with a 400 code if no review exists in database with comment id", () => {
        return request(app)
        .delete("/api/reviews/5000")
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Bad request."})
        })
    })


})

describe("GET /api/comments", () => {
    test("responds with a 200 code and an object with a property of comments which is an array", () => {
        return request(app)
        .get("/api/comments")
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray (body.comments)).toBeTruthy()
        })
    })
    test("Array should contain correct ammount of objects with slug and description keys", () => {
        return request(app)
        .get("/api/comments")
        .then(({body}) => {
            for (let i in body.comments) {
                expect(body.comments[i].hasOwnProperty("review_id")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("title")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("comment_id")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("author")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("votes")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("created_at")).toBeTruthy()
                expect(body.comments[i].hasOwnProperty("body")).toBeTruthy()
                expect(Object.keys(body.comments[i]).length).toBe(7)
            }
        })
    })
})

describe("POST /api/users", () => {
    test("Responds with 201 and a user object", () => {
        const newUser = {
            username: "cardgamez",
            name: "52 pickup!! hahah lol",
            avatar_url: "wwww.website.com"
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({body}) => {
            const {user} = body
            expect(typeof user).toBe("object")
        })
    })
    test("Returned comment must have the correct keys", () => {
        const newUser = {
            username: "cardgamez",
            name: "52 pickup!! hahah lol",
            avatar_url: "wwww.website.com"
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({body}) => {
            const {user} = body
            expect(user).toMatchObject({
                username: "cardgamez",
                name: "52 pickup!! hahah lol",
                avatar_url: "wwww.website.com"
            })
            expect(Object.keys(user).length).toBe(3)
            
        })
    })
    test("Ignores extra category properties and returns successfully", () => {
        const newUser = {
            username: "cardgamez",
            name: "52 pickup!! hahah lol",
            avatar_url: "wwww.website.com",
            body: "Let me start by thanking you for such a lovely opportunity to comment.",
            body2: "Would you believe its been some time since i used this website",
            body3: "And back in my day things worked a little differently.",
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({body}) => {
            const {user} = body
            expect(user).toMatchObject({
                username: "cardgamez",
                name: "52 pickup!! hahah lol",
                avatar_url: "wwww.website.com"
            })
            expect(Object.keys(user).length).toBe(3)
            
        })
    })
    test("Responds with 400 error if username already exists" , () => {
        const newUser = {
            username: "mallionaire",
            name: "52 pickup!! hahah lol",
            avatar_url: "wwww.website.com"
        }
        
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Username already exists."})

        })

    })

    test("Responds with 400 error if request object incomplete" , () => {
        const newUser = {
            username: "mallionaire"
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({body}) => {
            expect(body).toEqual({msg: "Request incomplete."})

        })
    })
})

describe("GET /api/reviews/user/:username", () => {
    test("Responds with a 200 code and an object with a property of reviews which contains an array", () => {
        return request(app)
        .get("/api/reviews/user/philippaclaire9")
        .expect(200)
        .then(({body}) => {
            expect(body.hasOwnProperty("reviews")).toBeTruthy()
            expect(Array.isArray(body.reviews)).toBeTruthy()
 
            
        })
    })
    test("Array should contain correct ammount of objects with correct properties", () => {
        return request(app)
        .get("/api/reviews/user/philippaclaire9")
        .then(({body}) => {
            const {reviews} = body
            expect(reviews.length).toBe(1)
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
    test("Responds with an empty array if there are no reviews for the username" , () => {
        return request(app)
        .get("/api/reviews/user/cancelledThenFiredFromCompany")
        .expect(200)
        .then(({body}) => {
            expect(body.reviews).toEqual([])
        })
    })
})


