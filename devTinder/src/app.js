const express = require("express");

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

app.listen(8888, () => {
    console.log("Server is running successfully on port 8888..!");
});