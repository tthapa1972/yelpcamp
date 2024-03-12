const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgroundController = require('../controller/campgrounds');
const {isLoggedin, validateCampground, isAuthor} = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })



router.route('/')
      .get(catchAsync(campgroundController.index))
      .post(isLoggedin, upload.array('image'), validateCampground,catchAsync(campgroundController.createCampground));

router.get('/new', isLoggedin, campgroundController.rendernewForm);


router.route('/:id')
      .get(catchAsync(campgroundController.showCampground))
      .put(validateCampground, isAuthor, catchAsync(campgroundController.editCampground))
      .delete(isAuthor, catchAsync(campgroundController.deleteCampground));

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(campgroundController.renderEditCampground));

module.exports = router;