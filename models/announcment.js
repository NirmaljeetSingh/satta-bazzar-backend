const mongoose = require('mongoose');

const AnnoucmentSchema = mongoose.Schema({
    title : {
        type : String,
        default : null
    },
    description: {
        type: String,
        default : null
    },
    adminno: {
        type: String,
        default : null
    },
    importanttext: {
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

module.exports = mongoose.model('announcemnts',AnnoucmentSchema);