var express = require("express");
var router = express.Router();
var movies = require("../models/movies");
var middleware = require("../middleware/index.js");


router.get("/movies",function(req,res){
	
	movies.find({},function(err,allmovies){if(err){console.log(err);}else{res.render("index" , {movies : allmovies , currentUser: req.user});}});

});
router.post("/movies" ,middleware.isLoggedIn, function(req,res){var name= req.body.name; var image= req.body.image; var desc= req.body.description;var author={ id: req.user._id, username: req.user.username} ; var newMovies = {name : name , image : image , description : desc , author : author }; movies.create(newMovies,function(err,newlyCreated){if(err){console.log(err);}else{res.redirect("/movies");}}); });



router.get("/movies/new",middleware.isLoggedIn, function(req,res){res.render("new.ejs");});

router.get("/movies/:id" , function(req,res){movies.findById(req.params.id , function(err , foundmovies){if(err){console.log(err);}else{res.render("show",{movies : foundmovies});}}); });

router.delete("/movies/:id",function(req,res){movies.findByIdAndRemove(req.params.id , function(err){if(err){res.redirect("/movies");}else{req.flash("success","Movie Deleted"); res.redirect("/movies");}});});




module.exports = router;