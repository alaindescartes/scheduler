const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    residenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Residence',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    shiftStart: {
        type: Date,
        required: true
    },
    shiftEnd: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
