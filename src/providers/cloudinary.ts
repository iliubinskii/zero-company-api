import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_BASE_FOLDER,
  CLOUDINARY_CLOUD_NAME
} from "../config";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({ secure: true });

/**
 * Uploads an image to Cloudinary.
 * @param file - The path to the image file.
 * @param remoteFolder - The remote folder to upload the image to.
 * @returns The upload response.
 */
export async function uploadImage(
  file: string,
  remoteFolder: string
): Promise<UploadApiResponse> {
  const result = await cloudinary.uploader.upload(file, {
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    cloud_name: CLOUDINARY_CLOUD_NAME,
    folder: `${CLOUDINARY_BASE_FOLDER}/${remoteFolder}`
  });

  return result;
}
