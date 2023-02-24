const db = require ("./../db/connection")
const format = require ("pg-format")

function fetchCategories () {

    return db.query(`SELECT * FROM categories;`)
    .then(({rows}) => {
        return rows
    })

}


function addCategory(category_obj) {

    return fetchCategories().then((categories) => {
        const slugs = categories.map((category) => {
            return category.slug
        })
        if (slugs.includes(category_obj.slug)) {
            return Promise.reject("Item already exists.")
        }
    })
    .then(() => {


        if (category_obj.hasOwnProperty("slug") === false || category_obj.hasOwnProperty("description") === false) {

            return Promise.reject("Request incomplete.")
        }



        const formatStr = format(`
        INSERT INTO categories
        (slug, description)
        VALUES
        %L
        RETURNING *;`,
    
        [[category_obj.slug, category_obj.description]]
        )
    
        return db.query(formatStr)
    
        }).then(({rows}) => {
            return rows[0]
    
        })


}




module.exports = {addCategory, fetchCategories}