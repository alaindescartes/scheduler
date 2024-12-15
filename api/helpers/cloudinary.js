import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables
dotenv.config({ path: envPath });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;
