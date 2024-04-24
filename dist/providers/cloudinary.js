"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const config_1 = require("../config");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({ secure: true });
/**
 * Uploads an image to Cloudinary.
 * @param file - The path to the image file.
 * @param remoteFolder - The remote folder to upload the image to.
 * @returns The upload response.
 */
async function uploadImage(file, remoteFolder) {
    const result = await cloudinary_1.v2.uploader.upload(file, {
        api_key: config_1.CLOUDINARY_API_KEY,
        api_secret: config_1.CLOUDINARY_API_SECRET,
        cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
        folder: `${config_1.CLOUDINARY_BASE_FOLDER}/${remoteFolder}`
    });
    return result;
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary.js.map