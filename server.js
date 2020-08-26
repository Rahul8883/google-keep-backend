/******************************************************************************
 *  @Purpose        : To create a server to connect with front end for getting 
                      request and sending response to client.
 *  @file           : server.js        
 *  @author         : RAHUL RANJAN
 *  @version        : v0.1
 *  @since          : 01-02-2020
 ******************************************************************************/
const databaseConfig = require("./configuration/dbConfiguration");
const userRouter = require("./router/user.router");
const mongoose = require("mongoose");
require("dotenv").config();
var expressValidator = require("express-validator");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(expressValidator());
app.use(cors());
app.use("/", userRouter);
mongoose
    .connect(databaseConfig.URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("connected to database successfully");
    })
    .catch(() => {
        console.log("err while connecting with database");
    });
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});