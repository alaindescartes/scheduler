import mongoose from 'mongoose';
const residenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

const Residence = mongoose.model('Residence', residenceSchema);
export default Residence;
