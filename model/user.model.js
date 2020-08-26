/****************************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : user.models.js
 *  @author         : RAHUL RANJAN
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *****************************************************************************************/
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
let saltRounds = 10;
const schema = mongoose.Schema;
const userScherma = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const user = mongoose.model("User", userScherma);

function userModel() {}

exports.registration = (req, callback) => {
    user.find({
            email: req.body.email
        },
        (err, data) => {
            if (err) {
                console.log("Error in registration");
                callback(err);
            } else {
                if (data.length > 0) {
                    console.log("email already exists", data);
                    callback("User already present");
                } else {
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if (err) {
                            throw err;
                        } else {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log(hash);
                                    var newUser = new user({
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        email: req.body.email,
                                        password: hash,
                                        profilePic: req.body.profilePic
                                    });
                                    newUser.save((err, result) => {
                                        if (err) {
                                            console.log("User not found");
                                            callback(err);
                                        } else {
                                            console.log("Registered Successfully");
                                            callback(null, result);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    );
};


exports.login = (req, callback) => {
    console.log("Email for login", req.email);

    console.log("Password for login", req.password);
    user.findOne({
            email: req.email
        },
        (err, result) => {
            console.log("result occur in model for result checking", result);
            console.log("result occur in model for result checking", result.password);
            if (err) {
                callback(err);
            } else if (result != null) {
                bcrypt.compare(req.password, result.password).then(function(res) {
                    console.log("respone data in model for testing", res);

                    if (res) {
                        console.log("Login Succesfully");
                        callback(null, result);
                    } else {
                        console.log("Login Failed");
                        callback("Incorrect password");
                    }
                });
            } else {
                console.log("Login Faileddd");
                callback("Invalid user");
            }
        }
    );
};

exports.forget = (req, callback) => {
    console.log("req occur in forget model", req.email);

    user.findOne({ email: req.email }, (err, result) => {
        console.log("response occur in model for result checking", result);
        if (err) {
            callback(err);
        } else {
            if (result != null && req.email == result.email) {
                callback(null, result)
            } else {
                callback("incorrect email id")
            }
        }
    });
};

exports.reset = (req, callback) => {

    console.log("req occur in reset model", req.body.password);
    try {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                throw (err)
            } else {
                console.log("encrypted password in model", req.body.password);

                bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
                    if (err) {
                        console.log("error occur while doing encryption with password", err);

                    } else {
                        console.log("decoded id in model ", req.decoded.payload)

                        user.updateOne({ _id: req.decoded.payload.user_id }, { password: encrypted }, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(null, result)
                            }
                        })
                    }
                })
            }
        })

    } catch (error) {
        console.log("error occur during reset password !!");

    }
};