import multer from 'multer';

/**
 * Middleware to handle multer upload errors
 */
export const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Only one file allowed' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Custom error
    return res.status(400).json({ error: err.message });
  }
  next();
};

export default handleUploadErrors;
