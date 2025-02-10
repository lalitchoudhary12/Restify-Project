if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

//express
const express = require("express")
const app = express()

//ejs
const path = require("path")
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"/views"))

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"/public")))

//method-override
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

//ejs mate
const ejsMate = require("ejs-mate")
app.engine("ejs", ejsMate)

//mongoose
const User = require("./models/user.js")
const mongoose = require("mongoose")
const DBURL = process.env.ATLAS_DBURL

main()
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.log(err)
    }
)
async function main (){
    await mongoose.connect(DBURL)
}


//express session
const session = require("express-session")
const MongoStore = require("connect-mongo")
const store = MongoStore.create({
    mongoUrl : DBURL,
    crypto : {
        secret : process.env.SECRET_CODE
    },
    touchAfter : 24 * 3600
})
const sessionOptions = {
    store,
    secret : process.env.SECRET_CODE,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expire : Date.now() + 7 * 24 * 60 * 60 * 1000,    //once you login or vist then after seven days cookie will expire automatically 
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true 
    }
}

app.use(session(sessionOptions))

//passport
const passport = require("passport")
const LocalStrategy = require("passport-local")
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// flash
const flash = require("connect-flash")
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})

//custom express error
const ExpressError = require("./utils/ExpressError.js")

//routes
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")
const bookingRouter = require("./routes/booking.js")

//server port
app.listen(8080,()=>{
    console.log("Server is listening on port 8080")
})



//listing route
app.use("/listings",listingsRouter)

//review route
app.use("/listings/:id/reviews",reviewsRouter)

//user route
app.use("/",userRouter)

//booking route
app.use("/",bookingRouter)

//contact path
const mail = process.env.Mail
app.get("/contact",(req,res)=>{
    res.render("includes/contact.ejs",{mail})
})

//error handling middlewares
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Sorry :( Page Not Found !!!"))
})

app.use((err,req,res,next) => {
    let {statusCode= 500 ,message="Something Went Wrong !!!"}= err
    res.status(statusCode).render("error.ejs",{message})
})

