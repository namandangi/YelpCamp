const express            = require("express"),
      router             = express.Router(),
      Campground         = require("../models/campgrounds"),
      middleware         = require('../middleware/index');
      //we can also do middleware = require('../middleware');   since express automatically includes file named index.js when you require an entire directory


//INDEX - show all campgrounds
router.get("", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var authorData = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name, image: image,price : price, description: desc,author:authorData}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT 
router.get("/:id/edit",middleware.campgroundOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{   
    //    console.log(currentUser,foundCampground.author.id);
        res.render("campgrounds/edit",{campground:foundCampground});        
    });
});


//UPDATE
router.put("/:id",(req,res)=>{
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,campground)=>{
            if(err)
            {
                console.log(err);
                res.redirect("/campgrounds");
            }
            else{
                res.redirect("/campgrounds/"+req.params.id);
            }
        });    
});

//DESTROY
router.delete("/:id",(req,res)=>{
    Campground.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else
        res.redirect("/campgrounds");
    })
});

module.exports  = router;