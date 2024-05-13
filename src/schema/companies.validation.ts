import { CompanyCreate, CompanyUpdate, ExistingCompany } from "./companies";
import {
  IdValidationSchema,
  ImageValidationSchema,
  preprocessBoolean,
  preprocessEmail,
  preprocessNumber
} from "./common";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MAX_CATEGORIES } from "./consts";
import _ from "lodash";
import zod from "zod";

const _id = IdValidationSchema;

const categories = zod.array(IdValidationSchema).nonempty().max(MAX_CATEGORIES);

const description = zod.string().min(1);

const foundedAt = zod.string().min(1);

const founder = zod.strictObject({
  confirmed: preprocessBoolean(zod.boolean()).optional(),
  email: preprocessEmail(zod.string().email()),
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
  share: preprocessNumber(zod.number().int().positive())
});

const founderCreate = founder.omit({ confirmed: true });

const founders = zod.array(founder).nonempty();

const foundersCreate = zod.array(founderCreate).nonempty();

const images = zod.array(ImageValidationSchema).nonempty();

const logo = ImageValidationSchema;

const name = zod.string().min(1);

const privateCompany = preprocessBoolean(zod.boolean()).optional();

const recommended = preprocessBoolean(zod.boolean()).optional();

const targetValue = preprocessNumber(zod.number().int().positive());

const website = zod.string().url().optional();

const fields = {
  _id,
  categories,
  description,
  foundedAt,
  founders,
  images,
  logo,
  name,
  privateCompany,
  recommended,
  targetValue,
  website
};

export const CompanyValidationSchema = zod.strictObject(fields);

export const CompanyCreateValidationSchema = zod.strictObject({
  ..._.omit(fields, "_id", "foundedAt", "founders", "recommended"),
  founders: foundersCreate
});

export const CompanyUpdateValidationSchema = zod.strictObject({
  description: description.optional(),
  images: images.optional(),
  logo: logo.optional(),
  name: name.optional(),
  privateCompany: privateCompany.nullable().optional(),
  website: website.nullable().optional()
});

// Type check the company create validation schema
((): Equals<
  keyof zod.infer<typeof CompanyValidationSchema>,
  keyof ExistingCompany
> => 1)();

// Type check the company create validation schema
((): Equals<
  keyof zod.infer<typeof CompanyCreateValidationSchema>,
  keyof CompanyCreate
> => 1)();

// Type check the company update validation schema
((): Equals<
  keyof zod.infer<typeof CompanyUpdateValidationSchema>,
  keyof CompanyUpdate
> => 1)();
