#YelpCamp
Objective 1:

* Add Landing Page
* Add campgrounds page that lists all campgrounds

Each Campground has:
* Name
* Image

Objective 2:
#Layout and Basic Styling:
* Create our header and footer partials
    * <%- include("partials/header")%>  
* Add in Bootstrap
    * Use a cdn and a link tag to include in head of header.ejs 

Objective 3:
#Creating New Campgrounds:
    * Setup new campground POST route
        - app.post([call back function])
        - had a route that had a form to create a new campground
    * Add in body parser
        - to access req.body.[parameters of object]
    * Setup route to show form
        - To show hyperlink to form at root page was to simply add an "a" tag with href to the route's absolute path
        - form was set up with a form tag with inputs and a button
        - inputs were named accordingly to access in post route 
        - if inputs were not named, the parameters entered in the form will not be able to be accessed, req.body will be empty!
    * Add basic unstyled form 
    
Objective 4:
#Style the campgrounds page:
    * Add a better header/title
        -  Used a "jumbotron" class from bootstrap 
        - wrapped the heading, tagline and button with a div of container class for additional padding
            - This also allowed that content to collapse appropriately when screen is shrunk
    * Make campgrounds display in a grid
        - used div row and column classes from bootstrap to make the displays be ina grid 
        - used the "thumbnail" class to create a more interactive look for the campgroundss
        
Objective 5:
#Style the navbar and the form:
    * Add a navbar to all templates
    * Style the new campground form 
        - Always be sure to wrap the form with a form tag, thats the only to pass data through!
        - Add the action route and method to the form tag as well!
        
Objective 6:
#Add Mongoose:
    * Install and configure Mongoose
        - var mongoose=require("mongoose");
          mongoose.connect(""mongodb://localhost:27018/yelp_camp",{useNewUrlParser: true}");
    * Setup campground model
        - Create schema first {remember schema is the pattern that any object added to db will possess}
        - var campgroundSchema = mongoose.Schema({
            name: String,
            image: String
        });
        - Create model that embodies schema
          var Campground = new mongoose.model("Campground",campgroundSchema);
        
    * use campground model inside of our routes
    
  #Show Page
   * RESTFUL routes
      - INDEX /dogs GET 
   * Add description to our campground model
      - Simply added another attribute
   * show db.collection.drop()
      - Deletes all data in db
   * add a show route/template
      - For "showing" elements from db
   

RESTFUL ROUTES (7 in Total)

Name     URL         Verb     Description
================================================
INDEX   /dogs        GET      Display a list of all dogs
NEW     /dogs/new    GET      Displays form to make a new dog
CREATE  /dogs        POST     Add a new dog to the db
SHOW    /dogs/:id    GET      Shows info about one dog

#Refactor mongoose code: 
* create models dir
  - To refactor code and maintain modularity 
* use models.export
  - Can be used to export anything really, including functions!
* require everything correctly


#Add the comment model:
* Make errors go away:{no comment.js!}
  - We added comment.js and exported the model
* Display comments on campground show page
  - We displayed the comments by first populating the comment references 
  - display them with enclosed p tags 
  - 

#Comment New/Create:
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form
* 

#AUTH 1:
* Install necessasry packages
* add user.js
* 

#AUTH 2:
* Configure Passport
* Add register routes
* Add register template
* 

#AUTH 3:
* Add login routes
* Add login templates 
* 

#AUTH 4:
* Add logout routes
* Prevent user from adding a comment if not signed in 
  - check if user is logged in at certain pages
* Add links to navbar
* 
#AUTH 5:
* SHow/hide auth links correctly?
* 

##REFACTOR Routes:
 * Use express router to reorganize all routes
    - Export:
      - We exported routes from app.js into seperate files
      - namely campground.js, comments.js and index.js
      - all of which are in a routes folder
    - Error Prevention:
      - to prevent errors of undeclared vars, we then required all necessasry vars
      - we then create an express router using a method from express
          - var router= express.Router()
      - we then replace all "app" in the file with router instead
          - This "adds" the different routes as methods to the router object
    -Conclusion in each file:
      - at the end of the file we export out the router object and 'use' it in app.js
    - In app.js:
      - we then require each of the above files 
        - var campgroundRoutes = require("./routes/campground.js");
      - then we let app "use" the variables
        - app.use(campgroundRoutes);
    - Further Polish in app.js:
      - We then pass in the "prefix"es of each route as the first parameter of app.use
        - app.use("/campgrounds",campgroundRoutes);
      - Once this is completed, we go to each file and rid off these common prefixes
        - CAVEAT: Once we do this, req.params.[param name] cannot be accessed
          - To access this we must pass the option: {mergeParams: true} as an argument to the express.Router() fn.
            - express.Router({mergeParams:true});
  
##Users + Comments:
* Associate users and comments
  - We did this by associating the comment to the user by having a reference 
  - we edited the author object in the comment model to have an ID and a username as attributes
  - the id was referenced from the id of the user FROM REQ.USER
* Save author's name to a comment automatically
  - Since the comment has both username and id, when foreaching the list of comments, we simply infer the author from there!
  - 
  
##Users + Campgrounds:
* Prevent unauthenticated user from adding a campground
  - used isloggedin middleware to deal with this
* save username+id to newly created campground
  - already tweaked the campground model to have an author tied to each campground
  - logged in user can create campground as the author of that campground
  - 
  
##Editing Campgrounds:
* Add method-ovveride
  - For updating, rmb html forms do not allow any other route except for POST and GET rouets
  - Therefore we must "trick" it to thinking its a POST route and then "override" it to be PUT/DELETE route
* Add edit route for campgrounds
  - Only to be shown to user who created the campground
  - use details of campground object to determine this 
* Add link to edit page
  - same as before(the blog)
  - we will have a prefilled form 
  - this route is only available to user who created it 
  - might need to create a middleware to verify the user
* Add update route???=> i thought its the same as edit???
  - Update route is where the change happens, edit route is simply the form!!!!
* Fix $set problem??? 
* 

#Delete Campgrounds:
* Add destroy route
* Add delete button
* 

#Authorization:
* User can only edit his/her own campgrounds
* User can only delete his/her own campgrounds
* Hide/show edit and delete buttons
* 

#Editing Comments:
* Add edit route for comments
* Add edit button
* Add Update route
* 

#Deleting Comments:
* Add destroy routes
* Add delete button
* 

#Authorization Part 2: Comments:
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor middleware
  - When moving middleware into its own dir
  - We name the dir "middleware" and the file "index.js"
  - Once done so, we do not need to refer it as such : var middlewareObj=require("../middleware/index.js");
  - Instead we can require it as such var middlewareObj=require("../middleware");
  - Both are fine, it must be noted that index.js denotes a file that is a subject of matter
  - 
  
#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header