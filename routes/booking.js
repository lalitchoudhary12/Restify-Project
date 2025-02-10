const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, validateBooking} = require("../middleware.js")
const bookingController = require("../controllers/booking.js")

//bookfrom route
router.get("/listings/:id/book",
    isLoggedIn ,  
    wrapAsync(bookingController.renderBookForm)
)

//confirm booking route
router.post("/listings/:id", 
    isLoggedIn ,  
    validateBooking,
    wrapAsync(bookingController.confirmedBooking)
)

//show bookings
router.get("/listings/bookings",
    isLoggedIn ,  
    wrapAsync(bookingController.renderShowBookings)
)

//delete booking
router.delete("/listings/bookings/:bookingId",
    isLoggedIn,
    wrapAsync(bookingController.destroyBooking)
)

module.exports = router