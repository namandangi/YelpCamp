var express =require("express"),
 bodyParser=require("body-parser"),
 mongoose=require("mongoose"),
 app=express();

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var campgroundSchema=mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground=mongoose.model("Campground",campgroundSchema);	

// Campground.create({
// 	name:"Lake View Camp",
// 	image:"https://images.thrillophilia.com/image/upload/s--78avAk7E--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/025/234/original/1561366752_01a136af-a9f0-4508-8692-18bc6788f87c.jpeg.jpg?1561366752",
// 	description:"This Campground is set across a beautiful lake"
// },function(err,campground){
// 	if(err)
// 		console.log(err);
// 	else{
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });



// var campgrounds=[
// 	{name:"SGNP",image:"https://images.thrillophilia.com/image/upload/s--ZbEHTtJZ--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/031/695/original/1560428830_2.jpg.jpg?1560428830"},
// 	{name:"Lake View Camp",image:"https://images.thrillophilia.com/image/upload/s--78avAk7E--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/025/234/original/1561366752_01a136af-a9f0-4508-8692-18bc6788f87c.jpeg.jpg?1561366752"},
// 	{name:"Bhandardara",image:"https://images.thrillophilia.com/image/upload/s--mYSy5XFL--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/128/192/original/1526384335_WP_20170716_12_06_55_Pro.jpg.jpg?1526384335"},
// 	{name:"SGNP",image:"https://images.thrillophilia.com/image/upload/s--ZbEHTtJZ--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/031/695/original/1560428830_2.jpg.jpg?1560428830"},
// 	{name:"Lake View Camp",image:"https://images.thrillophilia.com/image/upload/s--78avAk7E--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/025/234/original/1561366752_01a136af-a9f0-4508-8692-18bc6788f87c.jpeg.jpg?1561366752"},
// 	{name:"Bhandardara",image:"https://images.thrillophilia.com/image/upload/s--mYSy5XFL--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/128/192/original/1526384335_WP_20170716_12_06_55_Pro.jpg.jpg?1526384335"}
// ];


app.get("/",function(req,res){
	res.render("home");
});

//INDEX ROUTE -------- Displays all Campgrounds
app.get("/campgrounds",function(req,res){
	//Getting all campgrounds from database
	Campground.find({},function(err,allCampgrounds){
		if(err)
			console.log(err);
		else
			res.render("Index",{campgrounds:allCampgrounds});	
	});
	
	
});

//CREATE ROUTE ---------- Adds new Campgrounds to the Database  
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var newCampground={name:name,image:image,description:description};
	Campground.create(newCampground,function(err,newCampground){
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");	
	});
	//campgrounds.push(newCampground);  ---->before database
	
});

//NEW ROUTE --------- Displays a form to add new Campgrounds
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

//SHOW ROUTE 
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
			{console.log(err);}
		else
			res.render("show",{campground:foundCampground});	
	});
	
});

app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server is up and running");
});