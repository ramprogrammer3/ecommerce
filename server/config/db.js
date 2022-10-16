
const mongoose = require("mongoose");
const {URL} = require("./envConfig");

const connect = async() =>{
    try {
        await mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log("DB connection successful");
    } catch (error) {
        console.log(error.message)
        process.exit;
    }
}

module.exports = connect;