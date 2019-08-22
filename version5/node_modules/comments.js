var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	name : String,
	author : String
});

module.export = mongoose.model("Comment",commentSchema);