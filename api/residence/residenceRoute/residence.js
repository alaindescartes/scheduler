import express from "express"
import AppError from "../../error.js"
import Residence from "../residenceSchema.js"
import cloudinary from "../../helpers/cloudinary.js"
import upload from "../../helpers/multer.js"
import fs from "fs"

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

router.post(
  "/add_residence",
  upload.array("images"),
  async (req, res, next) => {
    const { name, location, description } = req.body
    const files = req.files
    const uploadFolder = "Momentum/residences"

    console.log("Uploaded Files:", files)

    if (!name || !location) {
      return next(
        new AppError(
          "The name and address of a residence must be provided",
          404
        )
      )
    }

    if (!files || files.length === 0) {
      return next(new AppError("No images were uploaded", 400))
    }

    try {
      // Check for duplicates
      const existingResidence = await Residence.findOne({ name })
      if (existingResidence) {
        return next(
          new AppError(
            `A residence with the name "${name}" already exists.`,
            409
          )
        )
      }

      // Upload images to Cloudinary
      const uploadedImages = []
      for (const file of files) {
        try {
          console.log("Processing File:", file.path)
          const result = await cloudinary.uploader.upload(file.path, {
            folder: uploadFolder,
          })
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          })

          // Remove temporary file
          fs.unlinkSync(file.path)
        } catch (error) {
          console.error("Error while uploading image:", error)
          return next(new AppError("Error while uploading images", 500))
        }
      }

      // Create a new residence document
      const newResidence = new Residence({
        name,
        location,
        description,
        images: uploadedImages,
      })

      await newResidence.save()

      res.status(200).json({
        residence: newResidence,
        message: "RenderResidence added successfully",
      })
    } catch (error) {
      console.error("Error while saving new residence:", error)
      next(new AppError("There was a problem while adding residence", 500))
    }
  }
)

export default router
