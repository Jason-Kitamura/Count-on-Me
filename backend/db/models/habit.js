const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let habit = new Schema ({
    title       : { type : String, required : true },
} );

module.exports = mongoose.model('habit', habit);