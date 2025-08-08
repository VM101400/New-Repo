const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
    // Sending a connection request
    
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        // val 1
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status});
        }
        // val 2
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found!!"});
        }
        // val 3
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).json({message: "Connection Request Already Exists!!"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status,
        });
        const data = await connectionRequest.save();

        // Send email notification
        const emailRes = await sendEmail.run("A new friend request from " + req.user.firstName,
            req.user.firstName + " is " + status + " in " + toUser.firstName
        );
        console.log("Email sent successfully: ", emailRes);

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
    // Reviewing a connection request
    // status can be "accepted" or "rejected"
    // requestId is the ID of the connection request
    // toUserId is the ID of the user who sent the request
    // fromUserId is the ID of the user who received the request
    // status can be "interested" or "ignored"
    // fromUserId is the ID of the user who sent the request
    // toUserId is the ID of the user who received the request
    try{
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not allowed!!"});
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if(!connectionRequest){
            return res.status(404).json({message: "Connection request not found"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message: "Connection request " +status, data});
    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;