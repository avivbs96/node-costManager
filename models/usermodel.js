
/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id:String,
  firstname: String,
  lastname: String,
  birthday: String
});

module.exports = mongoose.model('users', userSchema);
