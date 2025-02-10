const { types } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema ({
    email : {
        type : String,
        required : true
    },
    hotelBookingId : [
       {
           type :Schema.Types.ObjectId,
           ref : "Booking"
       }
    ]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema) 
