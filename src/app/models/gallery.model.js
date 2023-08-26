const { Schema, model } = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Counter = require('./Counter.model');

const gallerySchema = new Schema({
    id: {type: Number, unique: true},
    path: {type: String, required: true},
    minPath: {type: String},
    size: {type: Number},
    type: {type: String},
    mimetype: {type: String},
    name: {type: String},
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date, default: Date.now, required: true}
});

gallerySchema.pre('save', async function (next) {
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

gallerySchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = model('files', gallerySchema);