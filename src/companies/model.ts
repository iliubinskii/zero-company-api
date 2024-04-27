import { Company } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";

const Schema = new mongoose.Schema(
  {
    categories: { required: true, type: [String] },
    header: { required: true, type: String },
    images: { required: true, type: [String] },
    logo: { required: true, type: String },
    name: { required: true, type: String }
  },
  { versionKey: false }
);

export const CompanyModel: mongoose.Model<Company> = mongoose.model(
  "Company",
  Schema
);

typeCheck({
  categories: [],
  header: "",
  images: [],
  logo: "",
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
