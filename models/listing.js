const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./review.js")

const listingSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        url : String,
        filename: String
    }, 
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})


/* this middleware will work when any listing will deleted then in that listing 
the reviews are present then that all review will also deleted from reviews collection */
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in : listing.reviews}})
    }
})


const Listing = mongoose.model("Listing", listingSchema) 
module.exports = Listing