/****************************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : user.routes.js        
 *  @author         : RAHUL RANJAN
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *****************************************************************************************/
/**
 * @description  : importing express for creating router path.
 */
const express = require('express')
const middle = require('../middleWare/authontication')
const router = express.Router()
    /**
     * @description  : proving path for access the data.
     */
const userController = require('../controller/user.controller')
console.log("in router");
router.post('/register', userController.registration)
router.post('/login', userController.login)
router.post('/forget', userController.forget)
router.post('/reset/:token', middle.checkTokenResetPassword, userController.reset)

module.exports = router;