const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comment = new Schema ({
   name :  { type: String, trim: true, required: true, },
   body : { type: String, trim: true, required: true, }
} );

module.exports = mongoose.model('comment', comment);