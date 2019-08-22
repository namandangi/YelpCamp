var mongoose = require("mongoose"),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comments");


var data =[
	{
	   name: "Cloud's Rest", 
       image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	},
	{
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	},
	{
		name: "Desert Mesa", 
        image: "https://www.nps.gov/nabr/planyourvisit/images/campground_utahscyncty.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"	}
]
function seedDB()
{	//Remove all campgrounds
	Campground.remove({},function(err)
    {
		if(err)
			{
				console.log(err);
			}
		else
			{
				console.log("removed the campgrounds");
				//Add campgrounds
				data.forEach(function(seed){
					Campground.create(seed,function(err,campground){
						if(err)
						{
							console.log(err);
						}
						else
							{
								console.log("Added a campground");
								console.log(campground);
								//Add comments
								Comment.create({
									text : "The place is great but I wish I had some Cola",
									author :"Franky" 
								},function(err,comment){
									if(err)
										{
											console.log(err);
										}
									else
										{
											campground.comments.push(comment);
											campground.save();
											console.log("saved a comment");
										}
								})
							}
					});	
				});
				
			}
		
	});
	
}

module.exports = seedDB;