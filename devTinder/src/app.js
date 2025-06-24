const express = require("express");

const app = express();

app.use("/dashboard",(req, res) => {
    res.send("Hello from the Dashboard..!");
});

app.use("/hello",(req, res) => {
    res.send("Hello Hello Hello..!");
});

app.use("/test",(req, res) => {
    res.send("Hello from the server..!");
});
app.listen(8888, () => {
    console.log("Server is running successfully on port 8888..!");
});