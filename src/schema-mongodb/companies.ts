import { founder, webAccessibleImage } from "./common";
import { CompanyStatus } from "../schema";
import { getMongodbConnection } from "../providers";
import mongoose from "mongoose";

export const CompanySchema = new mongoose.Schema(
  {
    categories: {
      required: true,
      type: [mongoose.Schema.Types.ObjectId]
    },
    country: {
      required: true,
      type: mongoose.Schema.Types.String
    },
    createdAt: {
      required: true,
      type: mongoose.Schema.Types.Date
    },
    description: {
      type: mongoose.Schema.Types.String
    },
    foundedAt: {
      type: mongoose.Schema.Types.Date
    },
    founders: {
      required: true,
      type: [founder]
    },
    foundingAgreement: {
      type: mongoose.Schema.Types.ObjectId
    },
    images: {
      required: true,
      type: [webAccessibleImage]
    },
    logo: {
      type: webAccessibleImage
    },
    name: {
      type: mongoose.Schema.Types.String
    },
    privateCompany: {
      type: mongoose.Schema.Types.Boolean
    },
    recommended: {
      type: mongoose.Schema.Types.Boolean
    },
    status: {
      enum: Object.values(CompanyStatus),
      required: true,
      type: mongoose.Schema.Types.String
    },
    targetValue: {
      type: mongoose.Schema.Types.Number
    },
    website: {
      type: mongoose.Schema.Types.String
    }
  },
  { versionKey: false }
);

/**
 * Creates a company model.
 * @returns A company model.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
export async function getCompanyModel() {
  const connection = await getMongodbConnection();

  return connection.model("Company", CompanySchema);
}

export type CompanyModel = Awaited<ReturnType<typeof getCompanyModel>>;
