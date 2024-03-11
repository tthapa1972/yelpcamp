const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedin, isReviewAuthor} = require('../middleware');

router.post('/', isLoggedin, validateReview, catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Campground Review successfully created!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:reviewId',isLoggedin, isReviewAuthor, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Campground Review successfully deleted!!!');
    res.redirect(`/campgrounds/${id}`)
}));


module.exports = router;