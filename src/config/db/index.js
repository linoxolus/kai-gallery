const mongoose = require('mongoose');
const databaseURL = process.env.DB || 'mongodb://127.0.0.1/gallery';

function connect() {
    mongoose.connect(databaseURL)
    .then(() => console.log(`Connected success to ${databaseURL}`))
    .catch(() => console.log(`Failed success to ${databaseURL}, please check connection`));
}

module.exports = { connect };