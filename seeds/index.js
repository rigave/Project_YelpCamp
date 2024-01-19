const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR");
        console.log(err)
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "65a37f66a819ec1b1fe7186d",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, repudiandae! Placeat eius rerum saepe ipsa culpa. Asperiores dicta sit est quod impedit architecto odit explicabo nam, aliquam, adipisci, laborum ea?",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/ds2nfv8wx/image/upload/v1705411315/YelpCamp/vzqpdtz6ghkh4xi1ybhm.jpg',
                  filename: 'YelpCamp/vzqpdtz6ghkh4xi1ybhm',
                },
                {
                    url: 'https://res.cloudinary.com/ds2nfv8wx/image/upload/v1705413317/YelpCamp/niyrqjuvyxauh81zknvq.jpg',
                    filename: 'YelpCamp/niyrqjuvyxauh81zknvq',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
