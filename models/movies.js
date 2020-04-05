var mongoose = require("mongoose");
var moviesSchema = new mongoose.Schema({name : String , image: String , description: String , author : { id : { type: mongoose.Schema.Types.ObjectId, ref: "User"}, username: String}});
module.exports = mongoose.model("movies", moviesSchema);
