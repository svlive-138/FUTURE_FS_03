import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'igym-uploads';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL || `https://${BUCKET_NAME}.s3.amazonaws.com`;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Upload image to S3 with optimization
 * Resizes images to multiple sizes for responsive design
 */
export const uploadImageToS3 = async (file, folder = 'gallery') => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 10MB limit');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    const filename = `${timestamp}-${randomString}`;

    // Process and upload original image
    const originalBuffer = await processImage(file.buffer, {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 90,
    });

    const originalKey = `${folder}/original/${filename}.webp`;
    await uploadToS3(originalKey, originalBuffer, 'image/webp');

    // Generate thumbnail
    const thumbnailBuffer = await processImage(file.buffer, {
      maxWidth: 400,
      maxHeight: 400,
      quality: 80,
    });

    const thumbnailKey = `${folder}/thumbnail/${filename}.webp`;
    await uploadToS3(thumbnailKey, thumbnailBuffer, 'image/webp');

    // Generate medium size for preview
    const mediumBuffer = await processImage(file.buffer, {
      maxWidth: 800,
      maxHeight: 800,
      quality: 85,
    });

    const mediumKey = `${folder}/medium/${filename}.webp`;
    await uploadToS3(mediumKey, mediumBuffer, 'image/webp');

    // Return URLs
    return {
      original: `${CLOUDFRONT_URL}/${originalKey}`,
      thumbnail: `${CLOUDFRONT_URL}/${thumbnailKey}`,
      medium: `${CLOUDFRONT_URL}/${mediumKey}`,
      s3Keys: {
        original: originalKey,
        thumbnail: thumbnailKey,
        medium: mediumKey,
      },
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Process and optimize image using Sharp
 */
const processImage = async (buffer, options = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 90,
  } = options;

  try {
    return await sharp(buffer)
      .withMetadata()
      .rotate()
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();
  } catch (error) {
    console.error('Image processing error:', error);
    throw new Error('Failed to process image');
  }
};

/**
 * Upload buffer to S3
 */
const uploadToS3 = async (key, buffer, contentType) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
    CacheControl: 'max-age=31536000', // 1 year cache
    Metadata: {
      'Uploaded-At': new Date().toISOString(),
    },
  });

  try {
    await s3Client.send(command);
    console.log(`✓ Uploaded: ${key}`);
  } catch (error) {
    console.error('S3 upload failed:', error);
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

/**
 * Delete image from S3 (all variants)
 */
export const deleteImageFromS3 = async (s3Keys) => {
  try {
    const keysToDelete = [
      s3Keys.original,
      s3Keys.thumbnail,
      s3Keys.medium,
    ].filter(key => key);

    for (const key of keysToDelete) {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });
      await s3Client.send(command);
    }

    console.log('✓ Images deleted from S3');
  } catch (error) {
    console.error('S3 delete error:', error);
    // Don't throw - log and continue
  }
};

/**
 * Generate signed URL for private/temporary access
 */
export const generateSignedUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
};

/**
 * Validate AWS S3 configuration
 */
export const validateS3Config = () => {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing AWS configuration: ${missing.join(', ')}`);
  }

  console.log('✓ AWS S3 configuration validated');
  return true;
};

export default s3Client;
