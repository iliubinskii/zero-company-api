import { Company } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

const Schema = new mongoose.Schema(
  {
    categories: { required: true, type: [String] },
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
    name: { required: true, type: String }
  },
  { versionKey: false }
);

export const CompanyModel = mongoose.model("Company", Schema);

typeCheck({
  categories: [],
  header: {
    assetId: "",
    height: 0,
    secureUrl: "",
    url: "",
    width: 0
  },
  images: new mongoose.Types.DocumentArray([]),
  logo: {
    assetId: "",
    height: 0,
    secureUrl: "",
    url: "",
    width: 0
  },
  name: ""
});

/**
 * Type check
 * @param value - Value
 * @returns Value
 */
function typeCheck(value: InferSchemaType<typeof Schema>): Company {
  return value;
}
