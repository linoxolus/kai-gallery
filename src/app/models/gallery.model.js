const { Schema, model } = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Counter = require('./Counter.model');

const fileSchema = new Schema({
    id: {type: Number, unique: true},
    image: {type: String, required: true},
    size: {type: Number},
    mime: {type: String},
    name: {type: String},
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true}
});

fileSchema.pre('save', async function (next) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        '_file',
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.count;
      next();
    } catch (error) {
      next(error);
    }
  });

fileSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = model('files', fileSchema);