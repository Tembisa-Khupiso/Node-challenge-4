let mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    admin:{
        type: String,
        required: true
    }
});

let Student = module.exports = mongoose.model('Student', studentSchema);