import express from "express"
import AppError from "../../error.js"
import Residence from "../residenceSchema.js"
import cloudinary from "../../helpers/cloudinary.js"

//inits
const router = express.Router()

router.get("/all_residence", async (req, res, next) => {
  try {
    const residences = await Residence.find({})
    if (residences.length === 0) {
      return res.status(200).json({
        message: "No residences found",
        residences: [],
      })
    }

    res.status(200).json({
      message: "Success",
      residences: residences,
    })
  } catch (error) {
    next(new AppError("An error occurred while fetching residences", 500))
  }
})

router.post("/add_residence", async (req, res, next) => {
  const { name, location, description, images } = req.body
  const uploadFolder = "Momentum/residences"

  if (!name || !location) {
    next(
      new AppError("The name and address of a residence must be provided", 404)
    )
    return
  }

  try {
    // Check for duplicates
    const existingResidence = await Residence.findOne({ name })
    if (existingResidence) {
      next(
        new AppError(
          `A residence with the name "${name}" already exists. Please choose a unique name.`,
          409
        )
      )
      return
    }

    // Upload images and collect their URLs and public_ids
    const uploadedImages = []
    if (images && images.length > 0) {
      for (const img of images) {
        try {
          const result = await cloudinary.uploader.upload(img, {
            folder: uploadFolder,
          })
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          })
        } catch (error) {
          console.error("Error while uploading image:", error)
          next(new AppError("Error while uploading images", 500))
          return
        }
      }
    }

    // Create a new residence document
    const newResidence = new Residence({
      name,
      location,
      description,
      images: uploadedImages,
    })

    try {
      await newResidence.save()
    } catch (e) {
      console.error("Error while saving new residence:", e)
      next(new AppError("Error while saving the new residence", 500))
      return
    }

    res.status(200).json({
      residence: newResidence,
      message: "Residence added successfully",
    })
  } catch (error) {
    console.error("Error while saving new residence:", error)
    next(new AppError("There was a problem while adding residence", 500))
  }
})

export default router
