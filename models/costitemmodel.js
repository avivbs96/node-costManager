/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/


const mongoose = require('mongoose');

const costItemSchema = new mongoose.Schema({
  user_id: String,
  year: Number,
  month: Number,
  day: Number,
  description: String,
  category: {
    type: String,
    enum: ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other']
  },
  sum: Number
});

module.exports = mongoose.model('CostItem', costItemSchema);
