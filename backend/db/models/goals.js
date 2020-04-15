const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let goal = new Schema ({
    name        : { type : String, required : true },
    completed   : { type : Boolean, default : false},
    date        : { type : Date, default : Date.now }
} );

module.exports = mongoose.model('goal', goal);