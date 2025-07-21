"use server";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set in environment variables
  api_key: process.env.CLOUDINARY_API_KEY,      // Set in environment variables
  api_secret: process.env.CLOUDINARY_API_SECRET, // Set in environment variables
  secure: true,
});

// Export an async function that interacts with Cloudinary
export async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'paw-marketplace', // Optional: Specify a folder in Cloudinary
    });
    return result.secure_url; // Return the uploaded image URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}
