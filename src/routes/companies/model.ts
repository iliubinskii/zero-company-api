import { Company } from "../../schema";
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

export const CompanyModel = mongoose.model(
  "Company",
  new mongoose.Schema<Company>(Schema, { versionKey: false })
);

// Type check the company schema
((): Equals<keyof typeof Schema, keyof Company> => 1)();
