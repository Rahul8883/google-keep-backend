/******************************************************************************
 *  @Purpose        : To create user controller to handle the incoming data. 
 *  @file           : user.controllers.js        
 *  @author         : RAHUL RANJAN
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const userService = require('../services/user.services');
const token = require('../token')
const sent = require('../middleWare/nodeMailer')
exports.registration = (req, res) => {
    try {
        console.log("===========", req.body);
        req.checkBody('firstName', 'firstName is invalid').notEmpty()
        req.checkBody('lastName', 'lastName is invalid').notEmpty().isAlpha();
        req.checkBody('email', 'email is required').notEmpty();
        req.checkBody('password', 'password is required').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.success = false;
            return res.status(422).send(response);
            console.log("ERROR OCCUR IN REGISTARTION CONTROLLER", error);
        } else {
            console.log("REGISTRATION DATA COMES IN USER CONTROLLER ", req.body);
            userService.registration(req, (err, data) => {
                if (err) {
                    console.log("err", err);
                    res.status(404).send(err)
                } else {
                    res.status(200).send("REGISTERED SUCCESSFULLY");
                }
            })
        }
    } catch (error) {
        console.log("error", error);
    }
}

exports.login = (req, res) => {
    try {
        req.checkBody('email', 'email is required').notEmpty();
        req.checkBody('password', 'password is required').notEmpty().len(8, 13);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.status = false;
            response.error = error;
            response.message = "login failed";
            response.success = true;
            response.result = result;
            return res.status(422).send(response);
            console.log("ERROR OCCUR IN LOGIN CONTROLLER", error);
        } else {
            var responseResult = {};
            userService.login(req.body, (err, result) => {
                console.log("login enter for result : ---", result);

                console.log("RESPONSE IN USER CONTROLLER FOR LOGIN", req.body);
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Login Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Login Successfully';
                    responseResult.result = result;
                    console.log("value of result in controller is ", result);

                    const payload = {
                        user_id: result._id,
                        username: result.firstName,
                        usersirname: result.lastName,
                        email: result.email,
                        profilePic: result.profilePic,
                        sucess: true
                    }
                    console.log(payload);
                    const obj = token.GenerateTokenAuth(payload);
                    responseResult.token = obj;
                    res.status(200).send(responseResult.token.token);
                }
            })
        }
    } catch (error) {
        console.log("error", error);
    }
}


exports.forget = (req, res) => {
    try {
        req.checkBody('email', 'email is required').notEmpty();
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.status = false;
            response.error = error;
            response.message = "forget failed";
            response.success = false;
            response.result = result;
            return res.status(422).send(response);
            console.log("ERROR OCCUR IN LOGIN CONTROLLER", error);
        } else {
            var responseResult = {};
            userService.forget(req.body, (err, result) => {
                console.log("forget enter for result : ---", result);

                console.log("RESPONSE IN USER CONTROLLER FOR FORGOT PASSWORD", req.body);
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'forget Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'resetPassword link is sent to your registered email_Id';
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    console.log("payload in controller", payload);
                    const obj = token.GenerateTokenResetPassword(payload);
                    const url = `http://localhost:4000/reset/${obj.token}`;
                    sent.sendMailerFunction(url)
                    res.status(200).send(url);
                }
            })
        }
    } catch (error) {
        console.log("error", error);
    }
}

exports.reset = (req, res) => {
    try {
        req.checkBody('password', 'Invaild Password').isLength({
            min: 4
        });
        var errors = req.validationErrors();
        console.log("RESPONSE IN USER CONTROLLER IN RESET PASSWORD", req.body);

        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            res.status(422).send(response);
        } else {
            var responseResult = {};
            userService.reset(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Password Reset failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Password Reset Successfully';
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    console.log(payload);
                    const obj = token.GenerateTokenAuth(payload);
                    responseResult.token = obj;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}