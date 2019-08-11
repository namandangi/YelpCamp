var express =require("express"),
    bodyParser=require("body-parser"),
 	mongoose=require("mongoose"),
 	app=express(),
 	Campground = require("./models/campgrounds"),
 	seedDB = require("./seeds");

	

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
seedDB();

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
			res.render("Show",{campground:foundCampground});	
	});
	
});

app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server is up and running");
});