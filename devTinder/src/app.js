const express = require("express");
const { connectDB } = require("./config/database");
const User = require('./models/user');
const user = require("./models/user");
const app = express();

/*

app.use("/hello/bro",(req, res) => {
    res.send("Hello brother..!");
});

app.use("/hello/user",(req, res) => {
    res.send("Hello, User..!");
});
  
app.use("/hello",(req, res) => {
    res.send("Hello Hello Hello..!");
});

app.use("/test/userdata",(req, res) => {
    res.send("User data..!");
});

app.use("/test",(req, res) => {
    res.send("Hello from the server..!");
});

app.use("/",(req, res) => {
    res.send("Hello from the Dashboard..!");
});

*/

/*

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstname: "Prakash", lastname: "Maddi"});
});

app.post("/user", (req, res) => {
    //saving data to the db
    res.send("Data successfully saved to the db");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
});

// This will match all the HTTP method API calls to /test
app.use("/test",(req, res) => {
    res.send("Hello from the server..!");
});

*/

// app.get("/user/:userid/:name/:password", (req, res) =>{
//     console.log(req.params);   //req.query
//     res.send({firstname: "Sainath", lastname: "Maddi"});
// });

// app.use("/route", rH, [rH2, rH3], rH4, rH5);

/*
app.use("/user", 
    (req, res, next) => {
        console.log("Handling the route user!!");
       // res.send("Response.")
       next();
    }, 
    (req, res, next) => {
      console.log("Handling the route user 2!!");
      //res.send("2nd Response.")
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 3!!");
      //res.send("3rd Response.")
      next();
    },
    (req, res, next) => {
      console.log("Handling the route user 4!!");
      res.send("4th Response.")
    }
);

*/

/*
// GET /users => middleware chain => request handler
app.use("/user", (req, res, next) => {
        console.log("Handling the route user!!");
       next();
});

app.use("/user", (req, res, next) => {                  //
        console.log("Handling the route user 2!!");     //  These are middleware
        //res.send("1st Route Handler.")                //
        next();                                         //
},

(req, res, next) => {                                   //
        console.log("Handling the route user 2!!");     //  These are middleware
        //res.send("2nd Route Handler.")                //
        next();                                         //
},

(req, res, next) => {
        console.log("Handling the route user 2!!");
        res.send("3rd Route Handler.")                  // request handler
});

*/

/*
const {adminAuth, userAuth} = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.use("/user", userAuth, (req, res) => {
    res.send("User data sent");
});

app.use("/admin/getAllData", (req, res) => {
    res.send("All data sent");
});


app.use("/admin/deleteUser", (req, res) => {
    res.send("Deleted a User");
});

*/

/*
app.use("/", (err, req, res, next) => {
    if(err) {
        // Log your error
        res.status(500).send("something went wrong");
    }
});

app.get("/getUserData", (req, res) => {
    try{
        // Logic of DB call and get user data
        throw new Error("jyhtgdf");
        res.send("User data sent");
    }
    catch (err){
        res.status(500).send("Some error contact support team");
    }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        // Log your error
        res.status(500).send("something went wrong");
    }
});

*/

app.use(express.json());

app.post("/signup", async (req, res) => {

    
    // Creating a new instance of the User model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
});

// Get user by emailId
app.get("/user", async (req, res) =>{
    const userEmail = req.body.emailId;
    // try{
    //     const users = await User.findOne({emailId: userEmail}).exec();
    //     if(!users){
    //         res.status(400).send("User not found!");
    //     }else{
    //         res.send(users);
    //     }
    // }
    // catch(err){
    //     res.status(400).send("Something went wrong");
    // }
    
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(400).send("User not found!");
        }else{
            res.send(users);
        }
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

connectDB()
.then(() => {
    console.log("Database connection established...");
    app.listen(8888, () => {
        console.log("Server is running successfully on port 8888..!");
    });
})
.catch(err => {
    console.log("Database cannot be connected!!");
});
