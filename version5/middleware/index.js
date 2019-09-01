const   Campground        = require('../models/campgrounds'),
        Comment           = require('../models/comments');


var middlewareObject    = {};

middlewareObject.isLoggedIn     = (req, res, next)=>
{
    {
        if(req.isAuthenticated())
        {
            return next();
        }
        req.flash("error","You most be logged in to do that !");
        res.redirect("/login");
    }
};

middlewareObject.campgroundOwnership     = (req,res,next)=>{
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground)
        {
            if(err)
            {
                req.flash("error",err.message);
                res.redirect("back");
            }
            else 
            {
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) 
                {
                    next();
                }
                else 
                {
                    req.flash("error","You do not have the permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else 
    {
        req.flash("error","You must be logged in to do that");
        res.redirect("back");
    }
}
};

middlewareObject.commentOwnership   = (req,res,next)=>
{
    {
        if(req.isAuthenticated)
        {
            Comment.findById(req.params.comment_id,(err,comment)=>
            {
                if(err)
                {
                    console.log(err);
                    req.flash("error",err.message);
                    res.redirect("back");
                }
                    
                else
                {
                //check if the comment is of the user
                    if(comment.author.id.equals(req.user._id))
                    {
                        return next();
                    }
                    else 
                    {
                        req.flash("error","You do not have the permission to do that");
                        res.redirect("back");
                    }   
                }
            });
        }
        else 
       {
            req.flash("error","You must be logged in to do that");
            res.redirect("back");
       }
    }
};
module.exports      = middlewareObject;
//export default middlewareObject;