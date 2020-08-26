/****************************************************************************************
 *  @Purpose        : To write the testing logic for controller using mocha and chai.
 *  @file           : controllertest.js        
 *  @author         : RAHUL R S
 *  @version        : v0.1
 *  @since          : 12-02-2020
 *****************************************************************************************/

let assert = require('assert');
let loginControllerTest = require('../controller/user.controller');
let loginController = loginControllerTest.login
describe('LoginController', function () {

  describe('isValidUserId', function () {

    it('should return true if valid user id', function () {
      let isValid = loginController.isValidUserId(['abc123', 'xyz321'], 'abc123')
      assert.equal(isValid, true);
    });

    it('should return false if invalid user id', function () {
      let isValid = loginController.isValidUserId(['abc123', 'xyz321'], 'abc1234')
      assert.equal(isValid, false);
    });

  });

  describe('isValidUserIdAsync', function () {

    it('should return true if valid user id', function (done) {
      loginController.isValidUserIdAsync(['abc123', 'xyz321'], 'abc123',
        function (isValid) {
          assert.equal(isValid, true);
          done();
        });
    });

  });
});