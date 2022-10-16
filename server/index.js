
const express = require("express");
const app = express();
const {PORT} = require("./config/envConfig");
const port = PORT || 8080;
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// database connection
connect();
app.use(express.json());
app.use("/api",userRoutes);


app.get("/",(req,res)=>{
    res.send("welcome to express js ");
})

app.listen(port,()=>{
    console.log(`server is runnin on port ${port}`);
})

