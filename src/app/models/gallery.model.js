const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    id: {type: Number, unique: true},
    image: {type: String, required: true},
    size: {type: Number},
    mime: {type: String},
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true}
});

module.exports = model('files', fileSchema);