import mongoose from "mongoose"
const residenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
)

const Residence = mongoose.model("Residence", residenceSchema)
export default Residence
