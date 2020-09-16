//running command: npx nodemon app.js works when nodemon or nodemon app.js fails
//all methods start with a lowercase
var methodOverride  =require("method-override"),
    LocalStrategy   =require("passport-local"),
    bodyParser      =require("body-parser"),
    Campground      =require("./models/campground"),
    passport        =require("passport"),
    mongoose        =require('mongoose'),
    express         =require("express"),
    Comment         =require("./models/comment"),
    seedDb          =require("./seeds"),
    flash           =require("connect-flash"),
    User            =require("./models/user.js"),
    app             =express();


//Required Routes
var campgroundRoutes=require("./routes/campgrounds.js"),
    commentRoutes   =require("./routes/comments.js"),
    indexRoutes     =require("./routes/index.js");
    
    
//seedDb(); //seed the database
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true});

/*mongoose.connect("mongodb+srv://gritter97:Est19xx$$!!@cluster0-4jtb3.mongodb.net/<dbname>?retryWrites=true&w=majority",{
*/   /* useNewUrlParser: true,
    useCreateIndex: true
}).then(function(){
    console.log("Connected to DB");
}).catch(function(err){
    console.log(err.message);
});*/
var url= process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
mongoose.set('useUnifiedTopology', true);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Chappie is such a cute dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//USING a MIDDLEWARE
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

//ROUTES - This tells app to use these, with specified route prefix as the first parameter
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//MIDDLEWARE fn.s that will be exported out to another file soon
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp App has started!");
});