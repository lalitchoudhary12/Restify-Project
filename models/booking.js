const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    hotelName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numGuests: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    roomType: {
        type: String,
        required: true,
        enum: ['single', 'double', 'suite'] 
    },
    specialRequests: {
        type: String,
        default: ''
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['creditCard', 'paypal', 'cash'] 
    },
    customerEmail: {
        type: String,
        required: true,
        match: [/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, 'Please enter a valid email address']
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid contact number'] 
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    },
    userId : {
        type :Schema.Types.ObjectId,
        ref : "User"
    }
});  

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
