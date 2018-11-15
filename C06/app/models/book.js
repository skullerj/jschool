const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  photoURL: { type: String, required: true },
  score: { type: Number, required: true },
  pageCount: { type: Number, required: true },
  lentTo: { type: ObjectId, default: null },
});

bookSchema.virtual('isLent').get(function () {
  return this.lentTo !== null;
});

module.exports = mongoose.model('book', bookSchema);
