//All the middleware goes here!
var middlewareObj={},
    Campground=require("../models/campground.js"),
    Comment =require("../models/comment.js");

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
            res.redirect("back");
        else if(!req.isAuthenticated())
            res.redirect("back");
        // I was initally comparing usernames, but Colt recommends not to, he recommends to compare IDs instead
        //IDs are unique!!! However, usernames are NOT!
        else if(foundCampground.author.id.equals(req.user._id))
            return next();
        else{
            req.flash("error","You don't have permission to do that");
            res.redirect("back");
        }
            
    });
};

middlewareObj.checkCommentOwnership=function(req,res,next){
     Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            req.flash("error","Comment not found");
            res.redirect("back");
        }
        else if(!req.isAuthenticated()){
            req.flash("error","You need to be logged in to that");
            res.redirect("back");
        }
        // I was initally comparing usernames, but Colt recommends not to, he recommends to compare IDs instead
        //IDs are unique!!! However, usernames are NOT!
        else if(comment.author.id.equals(req.user._id))
            return next();
        else{
            req.flash("error","You don't have permission to do that");
            res.redirect("back");
        }
            
    });
};

middlewareObj.isLoggedIn=function(req,res,next){
     if(req.isAuthenticated())
        return next();
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports=middlewareObj;