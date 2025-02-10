const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn,isListingOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({storage}) 

//Index route
router.get("/", wrapAsync(listingController.index))

//new route
router.get("/new", 
    isLoggedIn ,   //middleware to authenticate log in account
    listingController.renderNewForm
)

//Show route
router.get("/:id",
    wrapAsync(listingController.showListing)
)

//create route
router.post("/", 
    isLoggedIn , 
    upload.single('listing[image]'), 
    validateListing ,
    wrapAsync(listingController.createListing)
)

//edit route
router.get("/:id/edit",
    isLoggedIn ,  
    isListingOwner,
    wrapAsync(listingController.renderEditForm)
)

//update route 
router.put("/:id",  
    isLoggedIn ,
    isListingOwner,  
    upload.single('listing[image]'), 
    validateListing ,
    wrapAsync(listingController.updateListing)
)

//delete route
router.delete("/:id", 
    isLoggedIn , 
    isListingOwner, 
    wrapAsync(listingController.destroyListing)
)

module.exports = router