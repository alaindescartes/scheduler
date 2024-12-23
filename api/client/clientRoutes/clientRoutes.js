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

router.get('/:clientId', async (req, res, next) => {
  const { clientId } = req.params;
  try {
    const clientExist = await Client.findById(clientId);

    if (!clientExist) {
      return next(new AppError('client does not exist.', 404));
    }

    res
      .status(200)
      .json({ message: 'client fetched successfully', client: clientExist });
  } catch (err) {
    console.log('unable to get clients: ', err);
    next(new AppError('unable to fetch clients', 500));
  }
});

router.put('/:clientId/edit', async (req, res, next) => {
  const { clientId } = req.params;

  // Extract only the provided fields from the request body
  const updates = req.body;

  try {
    // Find the client by ID
    const client = await Client.findById(clientId);

    if (!client) {
      return next(new AppError('Cannot find client', 404));
    }

    // Update only the provided fields
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        client[key] = updates[key];
      }
    });

    // Save the updated client document
    await client.save();

    res.status(200).json({
      message: 'Client updated successfully',
      client,
    });
  } catch (error) {
    console.error('Error while editing client:', error);
    next(new AppError('Error while editing client', 500));
  }
});

export default router;
