function countComments (reviews, comments) {

    let reviewsCopy = [...reviews]
    let commentsCopy = [...comments]

    return reviewsCopy.map((review) => {
        let commentsCount = 0
        for (let i in commentsCopy) {
            if (commentsCopy[i].review_id === review.review_id) {
                commentsCount ++
            }
        }
        review.comment_count = commentsCount
        return review
    })

}


module.exports = {countComments}