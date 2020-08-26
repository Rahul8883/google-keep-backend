/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to user_model and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : user.services.js        
 *  @author         : RAHUL RANJAN
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const userModel = require('../model/user.model')
exports.registration = (req, callback) => {
    try {
        userModel.registration(req, (err, data) => {
            if (err) {
                console.log("error occur in registration service", err);
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (error) {
        callback(error);
    }
}

exports.login = (req, callback) => {
    console.log("in service of login", req);

    try {
        userModel.login(req, (err, data) => {
            if (err) {
                console.log("error occur in login service", err);
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (error) {
        callback(error);
    }
}

exports.forget = (req, callback) => {
    console.log("in service of forget", req);

    try {
        userModel.forget(req, (err, data) => {
            if (err) {
                console.log("error occur in forget service", err);
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (error) {
        callback(error);
    }
}

exports.reset = (req, callback) => {
    try {
        userModel.reset(req, (err, data) => {
            if (err) {
                console.log("error occur in reset service", err);
                callback(err)
            } else {
                callback(null, data)
                console.log("response data in service", data);
            }
        })
    } catch (error) {
        callback(error);
    }
}