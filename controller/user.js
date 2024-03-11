const User = require('../models/user');

module.exports.renderRegister = (req, res)=> {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            req.flash('success', 'User successfully registered');
            res.redirect('/campgrounds');
        });
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut(function (err){
        if(err){
            next(err);
        }
        req.flash('success', 'Good Bye!');
        res.redirect('/campgrounds');
    });
}