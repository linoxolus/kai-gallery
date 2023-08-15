const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    id: {type: Number, unique: true},
    image: {type: String},
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true}
});

module.exports = model('images', imageSchema);