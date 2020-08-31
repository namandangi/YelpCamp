const express            = require("express"),
      router             = express.Router({mergeParams:true}),   //  *important --since we have reduced route names we will have problem with passing id 
      Campground         = require("../models/campgrounds"),
      Comment            = require("../models/comments"),
      middleware         = require('../middleware/index');

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("./comments/comment", {campground: campground});
        }
    })
});

router.post("",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){    // req.params.id stores the id mentioned in the route /campgrounds/:id/comments
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
            /*create function takes an object and function-callback as parameters , the values passed by new comment form 
              can be accessed as req.body.<parameter-name> or as in this case , all the data has been stored in an object called 
              comment .  'check comment.ejs'
               */
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});


//EDIT
router.get("/:comment_id/edit",middleware.commentOwnership,(req,res)=>{
        Comment.findById(req.params.comment_id,(err,comment)=>{
            //if(err)
            //console.log(err);
            //else
            res.render("./comments/edit",{campground_id:req.params.id,comment:comment});
    });
});

//UPDATE
router.put("/:comment_id",(req,res)=>{
Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,comment)=>{
    if(err)
        console.log(err);
    else
    res.redirect("/campgrounds/"+req.params.id);
});
});

//DESTROY
router.delete("/:comment_id",(req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
        if(err)
        res.redirect("back");
        else
        res.redirect("/campgrounds/"+req.params.id+"/");
    });
});
    
module.exports  = router;