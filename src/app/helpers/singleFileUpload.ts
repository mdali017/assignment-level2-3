import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "duthiv22y",
  api_key: "939611967734855",
  api_secret: "c6Hlb1Q7Z0hjoG_aX7TyImhfMV4",
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Single file upload handler
const singleFileUpload = multer({ storage }).single("file");

// Function to upload file to Cloudinary
const uploadFileToCloudinary = async (filePath: string, publicId?: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
    });
    // Remove the file from the local system after upload
    await fs.unlink(filePath);
    return result.secure_url;
  } catch (error: any) {
    throw new Error(`Cloudinary Upload Error: ${error.message}`);
  }
};

export const SingleFileUpload = {
  singleFileUpload,
  uploadFileToCloudinary,
};
