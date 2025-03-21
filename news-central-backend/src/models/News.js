const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('News', NewsSchema);