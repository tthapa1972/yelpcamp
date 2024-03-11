const express = require('express');
const router = express.Router({ mergeParams: true });
const campgroundController = require('../controller/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedin, isReviewAuthor} = require('../middleware');

router.post('/', isLoggedin, validateReview, catchAsync(campgroundController.createReview));

router.delete('/:reviewId',isLoggedin, isReviewAuthor, catchAsync(campgroundController.deleteReview));


module.exports = router;