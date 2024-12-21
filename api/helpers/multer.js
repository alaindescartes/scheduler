// multerConfig.js
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Dynamic storage to create a unique folder for each request
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // e.g. "uploads/1679933701562"
    const uniqueFolderName = Date.now().toString();
    const uploadPath = path.join(process.cwd(), 'uploads', uniqueFolderName);

    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    // Store the folder path on req for later cleanup
    req.uploadPath = uploadPath;

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//Optional file filter + size limits
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed!'), false);
  } else {
    cb(null, true);
  }
};

// Export the configured upload middleware
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});
