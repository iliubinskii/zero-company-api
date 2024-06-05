import type { Company } from "../../../schema";
import type { CompanyImagesService } from "../../../types";
import type mongoose from "mongoose";

/**
 * Creates a MongoDB service for company images.
 * @param getCompanyModel - A function that returns the company model.
 * @returns A MongoDB service for company images.
 */
export function createCompanyImagesService(
  getCompanyModel: () => Promise<mongoose.Model<Company>>
): CompanyImagesService {
  return {
    addImage: async (id, image) => {
      const CompanyModel = await getCompanyModel();

      const company = await CompanyModel.findByIdAndUpdate(
        id,
        { $push: { images: image } },
        { new: true, runValidators: true }
      );

      return company ? company.toObject() : undefined;
    },
    deleteImage: async (id, assetId) => {
      const CompanyModel = await getCompanyModel();

      const company = await CompanyModel.findByIdAndUpdate(
        id,
        { $pull: { images: { assetId } } },
        { new: true }
      );

      return company ? company.toObject() : undefined;
    },
    updateImage: async (id, assetId, image) => {
      const CompanyModel = await getCompanyModel();

      const company = await CompanyModel.findOneAndUpdate(
        { "_id": id, "images.assetId": assetId },
        { $set: { "images.$": image } },
        { new: true, runValidators: true }
      );

      return company ? company.toObject() : undefined;
    }
  };
}

export interface GetCompanyModel {
  (): Promise<mongoose.Model<Company>>;
}
