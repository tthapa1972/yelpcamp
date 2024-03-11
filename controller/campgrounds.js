const Campground = require('../models/campground');

module.exports.index = async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}

module.exports.rendernewForm = (req, res)=> {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Campground successfully created!!!');
    res.redirect(`/campgrounds/${campground._id}`)   
}

module.exports.showCampground = async(req,res)=> {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground.author);
    if(!campground){
        req.flash('error', 'Cannot find the Campground!!!');
        return res.redirect('/campgrounds');
    }
    console.log(campground);
    res.render('campgrounds/show', {campground})
}

module.exports.renderEditCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find the Campground!!!');
        return res.redirect('/campgrounds');
    }
    
    res.render('campgrounds/edit', {campground})
}

module.exports.editCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted!!!');
    res.redirect('/campgrounds')
}