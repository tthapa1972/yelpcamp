const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');
const userController = require('../controller/user');

router.route('/register')
      .get(userController.renderRegister)
      .post(catchAsync(userController.registerUser));


router.route('/login')
      .get(userController.renderLogin)
      .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,userController.login);

router.get('/logout', userController.logout);

module.exports = router;