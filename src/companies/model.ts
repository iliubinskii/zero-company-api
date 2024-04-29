import { Company } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

const Schema = new mongoose.Schema(
  {
    categories: { required: true, type: [String] },
    description: { required: true, type: String },
    discoverable: { required: true, type: Boolean },
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
    header: {
      required: true,
      type: {
        assetId: { required: true, type: String },
        height: { required: true, type: Number },
        secureUrl: { required: true, type: String },
        url: { required: true, type: String },
        width: { required: true, type: Number }
      }
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
    recommended: { required: true, type: Boolean },
    targetValue: { required: true, type: Number },
    website: { required: true, type: String }
  },
  { versionKey: false }
);

export const CompanyModel = mongoose.model("Company", Schema);

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export function typeCheck(value: InferSchemaType<typeof Schema>): Company {
  return value;
}
