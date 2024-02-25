const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected!!');
});

const campgroundSchema = new Schema({
    title:String,
    price: String,
    description: String,
    location : String
});

module.exports = mongoose.model('Campground', campgroundSchema);