/*
WHy Seed db??:
    - Use to populate db with data for means of testign? 
*/

var mongoose= require("mongoose"),
    Campground= require("./models/campground"),
    Comment =require("./models/comment");
    
var data= [
        {
            name:"Blue skies",
            image:"https://images.unsplash.com/photo-1590122401646-5534a84afa13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mollis lorem, sed tincidunt dui. Pellentesque eget consequat diam, eget aliquet lorem. Pellentesque erat tellus, sagittis ut tincidunt in, scelerisque eget ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis faucibus ipsum. Duis sed magna sit amet sem rhoncus vehicula et nec eros. Quisque ut ornare dui, eu pellentesque lacus. Duis posuere at elit pulvinar semper. Maecenas iaculis orci quis convallis fringilla. Sed pellentesque posuere aliquam."
        },
        {
            name:"Red Skies",
            image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mollis lorem, sed tincidunt dui. Pellentesque eget consequat diam, eget aliquet lorem. Pellentesque erat tellus, sagittis ut tincidunt in, scelerisque eget ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis faucibus ipsum. Duis sed magna sit amet sem rhoncus vehicula et nec eros. Quisque ut ornare dui, eu pellentesque lacus. Duis posuere at elit pulvinar semper. Maecenas iaculis orci quis convallis fringilla. Sed pellentesque posuere aliquam."
        },
        {
            name:"Yellow Skies",
            image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec mollis lorem, sed tincidunt dui. Pellentesque eget consequat diam, eget aliquet lorem. Pellentesque erat tellus, sagittis ut tincidunt in, scelerisque eget ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis faucibus ipsum. Duis sed magna sit amet sem rhoncus vehicula et nec eros. Quisque ut ornare dui, eu pellentesque lacus. Duis posuere at elit pulvinar semper. Maecenas iaculis orci quis convallis fringilla. Sed pellentesque posuere aliquam."
        }
    ];
    
function seedDb(){
    
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err)
            console.log(err);
        
        else{
            console.log("All campgrounds removed!");
            
            //remove all comments first
            Comment.remove({},function(err){
                if(err)
                    console.log(err);   
            });
            //add a few campgrounds
            data.forEach(function(seed){
               Campground.create(seed,function(err,campground){
                    if(err)
                        console.log(err);
                    else{
                        console.log("Added a Campground");
                        
                        //create comments
                        Comment.create({
                            text: "This place is nice, or is it?",
                            author: "Habloo"
                        },function(err,comment){
                            
                            if(err)
                                console.log(err);
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                        
                        
                    }
               }); 
            }); 
        } 
    });
}

module.exports = seedDb;

    
    