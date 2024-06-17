import type { CompanyImagesService } from "../../../types";
import { MONGODB_RUN_VALIDATORS } from "../../../config";
import { getModels } from "../../../schema-mongodb";

/**
 * Creates a MongoDB service for company images.
 * @returns A MongoDB service for company images.
 */
export function createCompanyImagesService(): CompanyImagesService {
  return {
    addImage: async (id, image) => {
      const { CompanyModel } = await getModels();

      return CompanyModel.findByIdAndUpdate(
        id,
        { $push: { images: image } },
        { new: true, runValidators: MONGODB_RUN_VALIDATORS }
      );
    },
    deleteImage: async (id, assetId) => {
      const { CompanyModel } = await getModels();

      return CompanyModel.findByIdAndUpdate(
        id,
        { $pull: { images: { assetId } } },
        { new: true, runValidators: MONGODB_RUN_VALIDATORS }
      );
    },
    updateImage: async (id, assetId, image) => {
      const { CompanyModel } = await getModels();

      return CompanyModel.findOneAndUpdate(
        { "_id": id, "images.assetId": assetId },
        { $set: { "images.$": image } },
        { new: true, runValidators: MONGODB_RUN_VALIDATORS }
      );
    }
  };
}
