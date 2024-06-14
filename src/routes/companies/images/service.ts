import type { Company } from "../../../schema";
import type { CompanyImagesService } from "../../../types";
import { getModels } from "../../../schema-mongodb";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for company images.
 * @returns A MongoDB service for company images.
 */
export function createCompanyImagesService(): CompanyImagesService {
  return {
    addImage: async (id, image) => {
      const { CompanyModel } = await getModels();

      const company = await CompanyModel.findByIdAndUpdate(
        id,
        { $push: { images: image } },
        { new: true, runValidators: true }
      );

      return company;
    },
    deleteImage: async (id, assetId) => {
      const { CompanyModel } = await getModels();

      const company = await CompanyModel.findByIdAndUpdate(
        id,
        { $pull: { images: { assetId } } },
        { new: true, runValidators: true }
      );

      return company;
    },
    updateImage: async (id, assetId, image) => {
      const { CompanyModel } = await getModels();

      const company = await CompanyModel.findOneAndUpdate(
        { "_id": id, "images.assetId": assetId },
        { $set: { "images.$": image } },
        { new: true, runValidators: true }
      );

      return company;
    }
  };
}

export interface GetCompanyModel {
  (): Promise<mongoose.Model<Company>>;
}
