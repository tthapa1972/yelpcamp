const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgroundController = require('../controller/campgrounds');
const {isLoggedin, validateCampground, isAuthor} = require('../middleware');


router.get('/', catchAsync(campgroundController.index));

router.get('/new', isLoggedin, campgroundController.rendernewForm);

router.post('/', isLoggedin, validateCampground,catchAsync(campgroundController.createCampground))

router.get('/:id', catchAsync(campgroundController.showCampground))

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(campgroundController.renderEditCampground));

router.put('/:id', validateCampground, isAuthor, catchAsync(campgroundController.editCampground));

router.delete('/:id', isAuthor, catchAsync(campgroundController.deleteCampground));

module.exports = router;