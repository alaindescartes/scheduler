import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    residenceId: {
      type: Schema.Types.ObjectId,
      ref: 'Residence',
      required: true,
    },
    notes: {
      type: String,
    },
    carePlan: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
