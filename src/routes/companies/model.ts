import { COMPANY_STATUS, type Company } from "../../schema";
import type { Equals } from "ts-toolbelt/out/Any/Equals";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  categories: { required: true, type: [String] },
  country: { required: true, type: String },
  description: { type: String },
  foundedAt: { type: String },
  founders: {
    required: true,
    type: [
      {
        email: { required: true, type: String },
        firstName: { required: true, type: String },
        lastName: { required: true, type: String },
        share: { required: true, type: Number }
      }
    ]
  },
  images: {
    required: true,
    type: [
      {
        assetId: { required: true, type: String },
        height: { required: true, type: Number },
        secureUrl: { required: true, type: String },
        url: { required: true, type: String },
        width: { required: true, type: Number }
      }
    ]
  },
  logo: {
    type: {
      assetId: { required: true, type: String },
      height: { required: true, type: Number },
      secureUrl: { required: true, type: String },
      url: { required: true, type: String },
      width: { required: true, type: Number }
    }
  },
  name: { type: String },
  privateCompany: { type: Boolean },
  recommended: { type: Boolean },
  status: {
    enum: Object.values(COMPANY_STATUS),
    required: true,
    type: String
  },
  targetValue: { type: Number },
  website: { type: String }
} as const;

export const getCompanyModel: GetCompanyModel = createSingleton();

export interface GetCompanyModel {
  (): Promise<mongoose.Model<Company>>;
}

/**
 * Creates a company model singleton.
 * @returns A company model singleton.
 */
function createSingleton(): GetCompanyModel {
  let model: mongoose.Model<Company> | undefined;

  return async () => {
    const connection = await getMongodbConnection();

    model =
      model ??
      connection.model<Company>(
        "Company",
        new mongoose.Schema<Company>(Schema, { versionKey: false })
      );

    return model;
  };
}

// Type check the company schema
((): Equals<keyof typeof Schema, keyof Company> => 1)();
