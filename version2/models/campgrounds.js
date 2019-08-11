var mongoose = require("mongoose");

var campgroundSchema=mongoose.Schema({
	name:String,
	image:String,
	description:String,
	comments :[
		{
			type : mongoose.Schema.type.ObjectId,
			ref : "Comments"
		}
	]
});

module.exports = mongoose.model("Campground",campgroundSchema);	