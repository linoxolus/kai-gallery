const { Schema, model } = require('mongoose');

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: -1 }
});

module.exports = model('counter', CounterSchema);