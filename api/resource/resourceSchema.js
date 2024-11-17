const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['incident report', 'care plan', 'other'],
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
