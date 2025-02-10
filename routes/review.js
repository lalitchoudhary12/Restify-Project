const express = require("express")
const router = express.Router({mergeParams : true})    
/*basically mergeParams is used to collect data from parent route(/listings) 
(data as listing id that is present in req.params) and
then this data is also passed to this child route(/reviews) */
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

//review post route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
)

//review delete route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
)

module.exports = router