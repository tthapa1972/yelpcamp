const mongoose = require('mongoose');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected!!');
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0;i < 50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65ed65714741514390a05f84',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmyov4c3o/image/upload/v1710238002/yelpcamp/qkwpkwjz6r45hcgdvuqs.jpg',
                  filename: 'yelpcamp/qkwpkwjz6r45hcgdvuqs'
                },
                {
                  url: 'https://res.cloudinary.com/dmyov4c3o/image/upload/v1710238002/yelpcamp/vxwky0s3ekaatuvvmcxv.jpg',
                  filename: 'yelpcamp/vxwky0s3ekaatuvvmcxv',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {mongoose.connection.close();})