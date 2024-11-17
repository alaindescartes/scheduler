const mongoose = require('mongoose')

const clockInRecordSchema = new mongoose.Schema({
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
    clockInTime: {
        type: Date,
        required: true
    },
    clockOutTime: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('ClockInRecord', clockInRecordSchema);
