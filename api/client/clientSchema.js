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
      default: 'No notes added yet',
    },
    carePlan: {
      type: String,
      default: 'No careplan added yet',
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
    dateOfBirth: {
      type: Date,
      required: false,
      default: 'January 1, 1985',
    },
    phoneNumber: {
      type: String,
      required: false,
      default: '(000) 000-0000',
    },
    emergencyContact: {
      type: String,
      required: false,
      default: 'eg. Jane Doe (Spouse) - (000) 000-0000',
    },
    medicalHistory: {
      type: String,
      required: false,
      default: 'eg. Diabetes, Hypertension',
    },
    currentMedications: {
      type: String,
      required: false,
      default: 'eg. Metformin 500mg, Lisinopril 20mg',
    },
    address: {
      type: String,
      required: false,
      default: 'No address provided yet',
    },
    maritalStatus: {
      type: String,
      enum: ['married', 'single', 'Not provided'],
      required: false,
      default: 'Not provided',
    },
    allergies: {
      type: [String],
      required: false,
      default: [],
    },
    dietaryRestrictions: {
      type: [String],
      required: false,
      default: [],
    },
    preferredLanguage: {
      type: String,
      required: false,
      default: 'Not provided',
    },
    primaryPhysician: {
      name: { type: String, required: false, default: 'Not provided' },
      phone: { type: String, required: false, default: '(000) 000-0000' },
    },
    albertaHealthNbr: {
      type: String,
      required: false,
      // match: /^\d{9}$/,
      default: 'Not provided',
    },
    riskAssessment: {
      type: String,
      required: false,
      default: 'Not provided',
    },
  },

  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;
