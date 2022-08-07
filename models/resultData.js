const mongoose = require('mongoose');

const ResultDataSchema = mongoose.Schema({
    old : {
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
    },
    new: {
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

module.exports = mongoose.model('resultData',ResultDataSchema);