import type { Company, ExistingCompany } from "../../../schema";
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

      const company = await CompanyModel.findById(id);

      if (company) {
        company.images.push(image);

        const savedCompany = await company.save();

        const { _id, ...rest } = savedCompany.toObject();

        const existingCompany: ExistingCompany = {
          _id: _id.toString(),
          ...rest
        };

        return existingCompany;
      }
      return undefined;
    },

    deleteImage: async (id, assetId) => {
      const CompanyModel = await getCompanyModel();

      const company = await CompanyModel.findById(id);

      if (company) {
        const imageIndex = company.images.findIndex(
          img => img.assetId === assetId
        );
        if (imageIndex === -1) return 0;

        company.images.splice(imageIndex, 1);
        await company.save();
        return 1;
      }
      return 0;
    },

    updateImage: async (id, assetId, image) => {
      const CompanyModel = await getCompanyModel();
      const company = await CompanyModel.findById(id);

      if (company) {
        const imageIndex = company.images.findIndex(
          img => img.assetId === assetId
        );

        if (imageIndex === -1) return undefined;

        company.images[imageIndex] = image;

        const savedCompany = await company.save();

        const { _id, ...rest } = savedCompany.toObject();

        const existingCompany: ExistingCompany = {
          _id: _id.toString(),
          ...rest
        };

        return existingCompany;
      }
      return undefined;
    }
  };
}

export interface GetCompanyModel {
  (): Promise<mongoose.Model<Company>>;
}
