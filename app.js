const express = require('express');
const app = express();
const path = require('path');
const Campground = require('./models/campground');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=> {
    res.render('home')
})

app.get('/makecampground', async (req,res) => {
    const camp = new Campground({title: 'My BackYard', description : 'Cheap Camping!'});
    camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
