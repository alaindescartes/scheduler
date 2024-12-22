import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const clientSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    status: {
      type: String,
      enum: ['onsite', 'offsite'],
      default: 'onsite',
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },

  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;
