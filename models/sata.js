const mongoose = require('mongoose');

const SattaSchema = mongoose.Schema({
    title : {
        type : String,
        default : null
    },
    description: {
        type: String,
        default : null
    },
    resultDateTime: {
        type: Date,
        default : null
    },
    resultDate: {
        type: Date,
        default : null
    },
    resultA: {
        type: String,
        default : null
    },
    resultB: {
        type: String,
        default : null
    },
    resultC: {
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

module.exports = mongoose.model('sattas',SattaSchema);