import express from 'express';
import AppError from '../../error.js';
import Residence from '../residenceSchema.js';
import cloudinary from '../../helpers/cloudinary.js';
import upload from '../../helpers/multer.js';
import { promises as fs } from 'fs';

//inits
const router = express.Router();

router.get('/all_residence', async (req, res, next) => {
  try {
    const residences = await Residence.find({});
    if (residences.length === 0) {
      return res.status(200).json({
        message: 'No residences found',
        residences: [],
      });
    }

    res.status(200).json({
      message: 'Success',
      residences: residences,
    });
  } catch (error) {
    next(new AppError('An error occurred while fetching residences', 500));
  }
});

router.post(
  '/add_residence',
  upload.array('images'), // Multer middleware to handle image uploads
  async (req, res, next) => {
    const { name, location, description } = req.body;
    const files = req.files;
    const uploadFolder = 'Momentum/residences';

    // Validate required fields
    if (!name || !location) {
      return next(
        new AppError(
          'The name and location of a residence must be provided',
          404
        )
      );
    }

    if (!files || files.length === 0) {
      return next(new AppError('No images were uploaded', 400));
    }

    try {
      // Check for duplicate residence by name (Ensure "name" is indexed in the schema)
      const existingResidence = await Residence.findOne({ name });
      if (existingResidence) {
        return next(
          new AppError(
            `A residence with the name "${name}" already exists.`,
            409
          )
        );
      }

      // Upload images to Cloudinary in parallel
      console.time('Image Uploads');
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: uploadFolder,
          });
          await fs.unlink(file.path); // Asynchronously delete the temporary file
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        })
      );
      console.timeEnd('Image Uploads'); // Log how long uploads take

      // Create and save a new residence document
      console.time('MongoDB Save');
      const newResidence = new Residence({
        name,
        location,
        description,
        images: uploadedImages,
      });
      await newResidence.save();
      console.timeEnd('MongoDB Save'); // Log how long the database save takes

      // Respond to the client
      res.status(200).json({
        residence: newResidence,
        message: 'Residence added successfully',
      });
    } catch (error) {
      console.error('Error while adding residence:', error);
      next(new AppError('There was a problem while adding the residence', 500));
    }
  }
);

router.patch(
  '/edit_residence/:id',
  upload.array('images'), // Multer middleware for handling file uploads
  async (req, res, next) => {
    const { id } = req.params; // Residence ID
    const { name, location, description } = req.body; // Fields to update
    const files = req.files; // New image files, if any
    const uploadFolder = 'Momentum/residences';

    try {
      //Find the residence to update
      const residence = await Residence.findById(id);
      if (!residence) {
        return next(new AppError('Residence not found', 404));
      }

      //Handle new image uploads
      const newImages = [];
      if (files && files.length > 0) {
        for (const file of files) {
          try {
            // Upload new images to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
              folder: uploadFolder,
            });
            newImages.push({
              url: result.secure_url,
              public_id: result.public_id,
            });

            // Remove temporary file
            fs.unlinkSync(file.path);
          } catch (error) {
            console.error('Error uploading new image:', error);
            return next(new AppError('Error uploading new images', 500));
          }
        }
      }

      //Update residence fields
      if (name) residence.name = name;
      if (location) residence.location = location;
      if (description) residence.description = description;
      if (newImages.length > 0) {
        residence.images = [...residence.images, ...newImages];
      }

      // Save the updated residence
      await residence.save();

      // Step 4: Respond to the client
      res.status(200).json({
        residence,
        message: 'Residence updated successfully',
      });
    } catch (error) {
      console.error('Error updating residence:', error);
      next(new AppError('Error updating residence', 500));
    }
  }
);

router.delete('/delete_residence/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the residence by ID
    const residence = await Residence.findById(id);
    if (!residence) {
      return next(new AppError('Residence not found', 404));
    }

    //Delete images from Cloudinary
    try {
      const imagesToDelete = residence.images.map((image) => image.public_id);
      const result = await cloudinary.api.delete_resources(imagesToDelete, {
        invalidate: true,
      });
      console.log('Cloudinary deletion result:', result);
    } catch (error) {
      console.error('Error while deleting images:', error);
      return next(new AppError('Error while deleting images', 500));
    }

    //Delete the residence from the database
    await Residence.findByIdAndDelete(id);
    res.status(200).json({ message: 'Residence deleted successfully' });
  } catch (error) {
    console.error('Error while deleting residence:', error);
    return next(new AppError('Error while deleting residence', 500));
  }
});

export default router;
