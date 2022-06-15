const mongoose = require('mongoose');

const SattaSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    resetToken: {
        type: String,
        default : null
    },
    deletedAt: {
        type: Date,
        default : null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('admin',SattaSchema);