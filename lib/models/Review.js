const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id,
      delete ret._v;
    }
  }
});

module.exports = mongoose.model('Review', schema);
