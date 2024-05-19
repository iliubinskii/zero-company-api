/* eslint-disable no-unused-expressions -- Temp */

import { Company } from "../../../schema";
import { CompanyImagesService } from "../../../types";
import mongoose from "mongoose";

/**
 * Creates a MongoDB service for company images.
 * @param getCompanyModel - A function that returns the company model.
 * @returns A MongoDB service for company images.
 */
export function createCompanyImagesService(
  getCompanyModel: GetCompanyModel
): CompanyImagesService {
  return {
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    addImage: async (id, image) => {
      const CompanyModel = await getCompanyModel();

      id;
      image;
      CompanyModel;

      // eslint-disable-next-line no-warning-comments -- Assigned to David
      // TODO: Return updated company or undefined
      return undefined;
    },
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    deleteImage: async (id, assetId) => {
      const CompanyModel = await getCompanyModel();

      id;
      assetId;
      CompanyModel;

      // eslint-disable-next-line no-warning-comments -- Assigned to David
      // TODO: Return updated company or undefined
      return undefined;
    },
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    updateImage: async (id, assetId, image) => {
      const CompanyModel = await getCompanyModel();

      id;
      assetId;
      image;
      CompanyModel;

      // eslint-disable-next-line no-warning-comments -- Assigned to David
      // TODO: Return updated company or undefined
      return undefined;
    }
  };
}

export interface GetCompanyModel {
  (): Promise<mongoose.Model<Company>>;
}
