
const express = require("express");
const app = express();
const {PORT} = require("./config/envConfig");
const port = PORT || 8080;

app.get("/",(req,res)=>{
    res.send("welcome to express js ");
})

app.listen(port,()=>{
    console.log(`server is runnin on port ${port}`);
})

