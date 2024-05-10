import { Company } from "../../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { getMongodbConnection } from "../../providers";
import mongoose from "mongoose";

const Schema = {
  categories: { required: true, type: [String] },
  description: { required: true, type: String },
  foundedAt: { required: true, type: String },
  founders: {
    required: true,
    type: [
      {
        confirmed: { enum: [true], type: Boolean },
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
    required: true,
    type: {
      assetId: { required: true, type: String },
      height: { required: true, type: Number },
      secureUrl: { required: true, type: String },
      url: { required: true, type: String },
      width: { required: true, type: Number }
    }
  },
  name: { required: true, type: String },
  privateCompany: { enum: [true], type: Boolean },
  recommended: { enum: [true], type: Boolean },
  targetValue: { required: true, type: Number },
  website: String
} as const;

export const { getCompanyModel } = companyModelSingleton();

/**
 * Creates a company model singleton.
 * @returns A company model singleton.
 */
function companyModelSingleton(): CompanyModelSingleton {
  let model: mongoose.Model<Company> | undefined;

  return {
    getCompanyModel: async (): Promise<mongoose.Model<Company>> => {
      const connection = await getMongodbConnection();

      model =
        model ??
        connection.model<Company>(
          "Company",
          new mongoose.Schema<Company>(Schema, { versionKey: false })
        );

      return model;
    }
  };
}

interface CompanyModelSingleton {
  readonly getCompanyModel: () => Promise<mongoose.Model<Company>>;
}

// Type check the company schema
((): Equals<keyof typeof Schema, keyof Company> => 1)();
