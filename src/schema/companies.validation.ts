import { CompanyCreate, CompanyUpdate } from "./companies";
import {
  IdValidationSchema,
  preprocessBoolean,
  preprocessNumber
} from "./common";
import { Equals } from "ts-toolbelt/out/Any/Equals";
import { MAX_CATEGORIES } from "./consts";
import zod from "zod";

const founder = zod.strictObject({
  email: zod.string().email(),
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
  share: preprocessNumber(zod.number().int().positive())
});

const webAccessibleImage = zod.strictObject({
  assetId: zod.string().min(1),
  height: zod.number().int().positive(),
  secureUrl: zod.string().min(1),
  url: zod.string().min(1),
  width: zod.number().int().positive()
});

const categories = zod.array(IdValidationSchema).nonempty().max(MAX_CATEGORIES);

const description = zod.string().min(1);

const founders = zod.array(founder).nonempty();

const images = zod.array(webAccessibleImage).nonempty();

const logo = webAccessibleImage;

const name = zod.string().min(1);

const privateCompany = preprocessBoolean(zod.boolean());

const targetValue = preprocessNumber(zod.number().int().positive());

const website = zod.string().url();

export const CompanyCreateValidationSchema = zod.strictObject({
  categories,
  description,
  founders,
  images,
  logo,
  name,
  privateCompany: privateCompany.optional(),
  targetValue,
  website: website.optional()
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
  keyof zod.infer<typeof CompanyCreateValidationSchema>,
  keyof CompanyCreate
> => 1)();

// Type check the company update validation schema
((): Equals<
  keyof zod.infer<typeof CompanyUpdateValidationSchema>,
  keyof CompanyUpdate
> => 1)();