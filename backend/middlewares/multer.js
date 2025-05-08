import multer from "multer";

// Set up memory storage for multer, which stores the file in memory
const storage = multer.memoryStorage();

// Create a middleware for handling single file upload
// The uploaded file will be available under 'file' key in 'req.file'
export const singleUpload = multer({ storage }).single("file");
