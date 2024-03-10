const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedin, validateCampground, isAuthor} = require('../middleware');


router.get('/', catchAsync(async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}));

router.get('/new', isLoggedin, (req, res)=> {
    res.render('campgrounds/new');
})

router.post('/', isLoggedin, validateCampground,catchAsync(async (req, res, next) => {
        //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
        const campground = new Campground(req.body.campground);
        campground.author = req.user._id;
        await campground.save();
        req.flash('success', 'Campground successfully created!!!');
        res.redirect(`/campgrounds/${campground._id}`)   
}))

router.get('/:id', catchAsync(async(req,res)=> {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    console.log(campground.author);
    if(!campground){
        req.flash('error', 'Cannot find the Campground!!!');
        return res.redirect('/campgrounds');
    }
    console.log(campground);
    res.render('campgrounds/show', {campground})
}))

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find the Campground!!!');
        return res.redirect('/campgrounds');
    }
    
    res.render('campgrounds/edit', {campground})
}));

router.put('/:id', validateCampground, isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:id', isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted!!!');
    res.redirect('/campgrounds')
}));

module.exports = router;