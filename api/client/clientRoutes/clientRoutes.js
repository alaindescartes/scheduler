import express from 'express';
import AppError from '../../error.js';
import cloudinary from '../../helpers/cloudinary.js';
import { upload } from '../../helpers/multer.js';
import Client from '../clientSchema.js';
import fs from 'fs';
import Residence from '../../residence/residenceSchema.js';
const router = express.Router();

router.get('/all-clients', async (req, res, next) => {
  try {
    // Fetch all clients from the database
    const allClients = await Client.find();

    // Check if no clients are found
    if (!allClients || allClients.length === 0) {
      return next(new AppError('There are no clients at the moment', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Clients retrieved successfully',
      clients: allClients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    next(new AppError('An error occurred while fetching clients', 500));
  }
});

router.get('/:id/clients', async (req, res, next) => {
  const { id } = req.params;

  //verify the residence id
  const residence = await Residence.findById(id);
  if (!residence) {
    return next(new AppError('residence not found', 404));
  }

  try {
    const clients = await Client.find({ residenceId: id })
      .populate('residenceId')
      .exec();

    res
      .status(200)
      .json({ message: 'Clients fetched successfully', clients: clients });
  } catch (error) {
    console.log('Error while fetching residents ', error);
    return next(new AppError('Error while fetching residents', 500));
  }
});

router.post(
  '/:id/add_client',
  upload.array('images'), // Multer middleware
  async (req, res, next) => {
    const { firstName, lastName } = req.body;
    const { id } = req.params;
    const files = req.files || [];
    const uploadFolder = 'Momentum/clients'; // Cloudinary folder
    const ephemeralFolder = req.uploadPath; // the unique local folder from multer

    // Validate required fields
    if (!firstName) {
      return next(
        new AppError('The firstname of a resident must be provided', 404)
      );
    }
    if (!lastName) {
      return next(
        new AppError('The lastname of a resident must be provided', 404)
      );
    }

    if (!files.length) {
      return next(new AppError('No images were uploaded', 400));
    }

    //verify the id passed
    const residence = await Residence.findById(id);
    if (!residence) {
      return next(new AppError('residence not found', 404));
    }

    //verify if client exists
    const clientExists = await Client.findOne({
      lastname: lastName,
      firstname: firstName,
    });

    if (clientExists) {
      return next(new AppError('Client already exists', 404));
    }

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: uploadFolder,
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        })
      );

      // Create and save a new residence document
      console.time('MongoDB Save');
      const newClient = new Client({
        firstname: firstName,
        lastname: lastName,
        residenceId: id,
        images: uploadedImages,
      });
      await newClient.save();
      console.timeEnd('MongoDB Save');

      // Respond to the client
      res.status(200).json({
        client: newClient,
        message: 'client added successfully',
      });
    } catch (error) {
      console.error('Error while adding Client:', error);
      next(new AppError('There was a problem while adding the client', 500));
    } finally {
      // Cleanup: remove the entire ephemeral folder
      if (ephemeralFolder) {
        try {
          fs.rmSync(ephemeralFolder, { recursive: true, force: true });
        } catch (err) {
          console.error('Error deleting folder:', ephemeralFolder, err);
        }
      }
    }
  }
);

export default router;
