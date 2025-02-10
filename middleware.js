const Listing = require("./models/listing")
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError")
const {listingSchema,reviewSchema,bookingSchema} = require("./schema.js")


module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You must be logged in!")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

//server side to not delete and update listing by anyone only owner can do
module.exports.isListingOwner = async (req,res,next) =>{
    let {id} = req.params
    let listing = await Listing.findById(id)    
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error","You are not the owner of this listing")
        return res.redirect(`/listings/${id}`)
    } 
    next()
}

//middleware for server side
module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMsg)
    } else {
        next()
    }
}

//middleware for server side
module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMsg)
    } else {
        next()
    }
}

//server side to not delete review by anyone only author can do
module.exports.isReviewAuthor = async (req,res,next) =>{
    let { id, reviewId} = req.params
    let review = await Review.findById(reviewId)    
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error","You are not the author of this review")
        return res.redirect(`/listings/${id}`)
    } 
    next()
}

//middleware for server side
module.exports.validateBooking = (req,res,next) =>{
    let {error} = bookingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMsg)
    } else {
        next()
    }
}
