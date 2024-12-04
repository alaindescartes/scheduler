import express from "express"
import AppError from "../../error.js"
import Residence from "../residenceSchema.js"

//inits
const router = express.Router()

router.get("/all_residence", async (req, res, next) => {
  const residences = await Residence.find({})
  if (!residences) {
    next(new AppError("cannot find residences", 500))
    return
  }
  res.status(200).json({ message: "success", residences: residences })
})

export default router
