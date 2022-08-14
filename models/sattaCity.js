const mongoose = require('mongoose');

const SattaCitySchema = mongoose.Schema({
    title : {
        type : String,
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
    resultD: {
        type: String,
        default : null
    },
    resultE: {
        type: String,
        default : null
    },
    resultF: {
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

module.exports = mongoose.model('sattaCity',SattaCitySchema);