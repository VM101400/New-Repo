const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// whitelisting this origin domain name
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
