//schema for server side validating 
const Joi = require("joi")

module.exports.listingSchema = Joi.object({
    listing : Joi.object ({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.object({
            url: Joi.string(),
            filename : Joi.string()
        })
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})

module.exports.bookingSchema = Joi.object({
    booking : Joi.object({
        hotelName: Joi.string().required(),
        customerName: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        checkInDate: Joi.date().required(),
        checkOutDate: Joi.date().required().greater(Joi.ref('checkInDate')),
        numGuests: Joi.number().required().min(1).max(4),
        roomType: Joi.string().valid('single', 'double', 'suite').required(),
        specialRequests: Joi.string().allow(''),
        totalPrice: Joi.number().required(),
        paymentMethod: Joi.string().valid('creditCard', 'paypal', 'cash').required(),
        customerEmail: Joi.string().email().required(),
        contactNumber: Joi.string().pattern(/^\d{10}$/).required(),
        createdAt: Joi.date().default(() => new Date())
    }).required()
});