var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose=require("mongoose"); 

var flash = require("connect-flash");
var movies = require("./models/movies");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override"); 
var User = require("./models/user");
var moviesRoutes = require("./routes/movies");
var	authRoutes = require("./routes/auth");

//mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true , useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect('mongodb+srv://myyelpproj:prakhar@cluster0-dt1fp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("cookie-session")({secret: "Stephen Kimmel" , resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){res.locals.currentUser = req.user;res.locals.error= req.flash("error");res.locals.success= req.flash("success"); next();});

app.use(authRoutes);
app.use(moviesRoutes);
var port=process.env.PORT || 3000;
app.listen(port,function(){console.log("Yelp Project");});