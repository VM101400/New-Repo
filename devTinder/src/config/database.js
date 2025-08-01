
const mongoose = require("mongoose");

const connectDB = async () => {
    // Connect to MongoDB using Mongoose
    // This function establishes a connection to the MongoDB database
    // using the connection string provided.
    await mongoose.connect(
        // Connection string for MongoDB Atlas
        // This is a connection string for a MongoDB Atlas cluster
        // Replace 'your_username', 'your_password', and 'your_database' with your actual credentials
        // Example: "mongodb+srv://<username>:<password>@<cluster-url>/<database>"
        // Note: Ensure that the credentials are kept secure and not hard-coded in production code.
    "mongodb+srv://prakashmaddi:seCUSYF7Pw8PwHTP@namastenode.ft781go.mongodb.net/devTinder"     // refering to the cluster
    );
};


module.exports = {
   connectDB,
};