import { Company } from "../schema";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import mongoose from "mongoose";

const Schema = {
  categories: { required: true, type: [String] },
  description: { required: true, type: String },
  foundedAt: { required: true, type: String },
  founders: {
    required: true,
    type: [
      {
        confirmed: { required: true, type: Boolean },
        email: { required: true, type: String },
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
  privateCompany: { required: true, type: Boolean },
  recommended: { required: true, type: Boolean },
  targetValue: { required: true, type: Number },
  website: {
    default: null,
    type: String
  }
} as const;

export const CompanyModel = mongoose.model(
  "Company",
  new mongoose.Schema<Company>(Schema, { versionKey: false })
);

// Type check the company schema
((): Equals<keyof typeof Schema, keyof Company> => {
  return 1;
})();
