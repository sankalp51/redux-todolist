const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL);
        console.log("successfully connected to the database");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb;