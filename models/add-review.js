const db = require("../db/connection")
const fetchUsers = require ("./fetch-users")
const format = require ("pg-format")

function addReview (review_obj) {

    if (review_obj.hasOwnProperty("owner") === false || review_obj.hasOwnProperty("review_body") === false || review_obj.hasOwnProperty("title") === false || review_obj.hasOwnProperty("designer") === false || review_obj.hasOwnProperty("category") === false) {
    
        return Promise.reject("Request incomplete.")
    }


    return fetchCategories().then((categories) => {
        const slugs = categories.map((category) => {
            return category.slug
        })
        if (!slugs.includes(review_obj.category)) {
            return Promise.reject("Bad request.")
        }
    })
    .then(() => {

        return fetchUsers().then((result) => {


            
            const filtered = result.filter((user) => {
                if (user.username === review_obj.owner) {
                    return user
                }
            })

            if (filtered.length === 0) {
                return Promise.reject("Username does not exist.")
            }
        })

    })
    .then(() => {



        const formatStr = format(`
        INSERT INTO reviews
        (review_body, owner, title, designer, category, review_img_url, votes)
        VALUES
        %L
        RETURNING *;`,
    
        [[review_obj.review_body, review_obj.owner, review_obj.title, review_obj.designer, review_obj.category, review_obj.review_img_url, 0]]
        )
    
        return db.query(formatStr)
    
        }).then(({rows}) => {
            rows[0].comment_count = 0
            return rows[0]
    
        })

}

module.exports = addReview