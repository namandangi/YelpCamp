var express =require("express");
var bodyParser=require("body-parser");
var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var campgrounds=[
	{name:"SGNP",image:"https://images.thrillophilia.com/image/upload/s--ZbEHTtJZ--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/031/695/original/1560428830_2.jpg.jpg?1560428830"},
	{name:"Lake View Camp",image:"https://images.thrillophilia.com/image/upload/s--78avAk7E--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/025/234/original/1561366752_01a136af-a9f0-4508-8692-18bc6788f87c.jpeg.jpg?1561366752"},
	{name:"Bhandardara",image:"https://images.thrillophilia.com/image/upload/s--mYSy5XFL--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/128/192/original/1526384335_WP_20170716_12_06_55_Pro.jpg.jpg?1526384335"},
	{name:"SGNP",image:"https://images.thrillophilia.com/image/upload/s--ZbEHTtJZ--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/031/695/original/1560428830_2.jpg.jpg?1560428830"},
	{name:"Lake View Camp",image:"https://images.thrillophilia.com/image/upload/s--78avAk7E--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/025/234/original/1561366752_01a136af-a9f0-4508-8692-18bc6788f87c.jpeg.jpg?1561366752"},
	{name:"Bhandardara",image:"https://images.thrillophilia.com/image/upload/s--mYSy5XFL--/c_fill,f_auto,fl_strip_profile,h_300,q_auto,w_375/v1/images/photos/000/128/192/original/1526384335_WP_20170716_12_06_55_Pro.jpg.jpg?1526384335"}
];


app.get("/",function(req,res){
	res.render("home");
});

app.get("/campgrounds",function(req,res){
	res.render("camps",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name,image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});
app.listen(process.env.PORT||8000,process.env.IP,function(){
	console.log("Server is up and running");
});