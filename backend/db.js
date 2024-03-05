const mongoose = require("mongoose");
// require('dotenv').config();

function ConnectionToMongoose() {
    mongoose
        .connect("mongodb://localhost:27017/hotels", {
             useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connection done......!!!!!"))
        .catch((err) => console.error("Connection error:", err));
}

module.exports = ConnectionToMongoose;
