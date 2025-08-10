const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");

// This cron job will run every day at 8:00 AM
cron.schedule(" 0 8 * * *", async () => {
    // Send emails to all people who got requests the previous day
    try{
        // Get the date for yesterday
        const yesterday = subDays(new Date(), 1); 
        // Get the start of the day for yesterday 12:00am
        // This will give us the date with time set to 00:00:00
        const yesterdayStart = startOfDay(yesterday);
        // Get the end of the day for yesterday 11:59pm
        // This will give us the date with time set to 23:59:59
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart, // Greater than or equal to start of yesterday
                $lt: yesterdayEnd,  // Less than end of yesterday
            },
        }).populate("fromUserId toUserId");

        // Extract unique email addresses from the pending requests, Using Set to ensure uniqueness
        // Assuming pendingRequests is an array of objects with a toUserId property that has an emailId field
        // "Set(pendingRequests.map((req) =>  req.toUserId.emailId))" finds all unique email addresses and "..." will convert it to an array
        const listOfEmails = [
            ...new Set(pendingRequests.map((req) =>  req.toUserId.emailId)),
        ];
        console.log(listOfEmails);

        for(const email of listOfEmails){
            // Send Emails
            try{
                const res = await sendEmail.run("New Friend Request pending for " + email, 
                    "You have a new friend request pending. Please check your account for more details.");
                console.log(res);
            }catch(err){
                console.error(`Error sending email to ${email}:`, err);
            }
        }
    }catch(err){
        console.error(err);
    }
});
