const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}

module.exports.rendernewForm = (req, res)=> {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename}));
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
    if(!campground){
        req.flash('error', 'Cannot find the Campground!!!');
        return res.redirect('/campgrounds');
    }
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
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    campground.save();
    if(req.body.deleteImages){
        for(let image of req.body.deleteImages){
            await cloudinary.uploader.destroy(image);
        }

        await campground.updateOne({$pull : {images : {filename : { $in: req.body.deleteImages}}}});

    }
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted!!!');
    res.redirect('/campgrounds')
}
