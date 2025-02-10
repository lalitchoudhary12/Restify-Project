const Booking = require("../models/booking.js")
const User = require("../models/user.js")
const Listing = require("../models/listing.js")

module.exports.renderBookForm = async (req,res)=>{
    let {id}= req.params
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("booking/book.ejs",{listing})
}

module.exports.confirmedBooking = async (req,res)=>{
    const newBooking = new Booking(req.body.booking)
    newBooking.userId = req.user._id 
    const user = await User.findById(req.user._id)
    user.hotelBookingId.push(newBooking)
    await newBooking.save()
    await user.save()
    req.flash("success","Hotel Booking Confirmed!")
    res.redirect("/listings")
}

module.exports.renderShowBookings = async (req,res)=> {
    const user = await User.findById(req.user._id).populate("hotelBookingId");
    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/listings");
    }
    const listings = [];
    for (let booking of user.hotelBookingId) {
        const listing = await Listing.findOne({ title: booking.hotelName });
        if (listing) {
            listings.push(listing);
        }
    }
    res.render("booking/showBookings.ejs",{user,listings})
}

module.exports.destroyBooking = async(req,res)=>{
    let {bookingId} = req.params
    let user_id = req.user._id
    await User.findByIdAndUpdate(user_id,{$pull:{hotelBookingId: bookingId}})    
    // it will find user and then using pull operator it will also delete that bookingid from that hotelbookingsid array 
    await Booking.findByIdAndDelete(bookingId)
    req.flash("success","Your Hotel Booking is Cancelled!")
    res.redirect(`/listings/bookings`);
}


