const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let goal = new Schema ({
    title       : { type : String, required : true },
    description       : { type : String, required : true },
    completed   : { type : Boolean, default : false},
    StartDate        : { type : Date, default : Date.now },
    EndDate         : { type: Date}
} );

module.exports = mongoose.model('goal', goal);