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
        type: Number,
        default : null
    },
    resultB: {
        type: Number,
        default : null
    },
    resultC: {
        type: Number,
        default : null
    },
    resultD: {
        type: Number,
        default : null
    },
    resultE: {
        type: Number,
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