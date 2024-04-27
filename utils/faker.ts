import { Category, Company } from "../src/schema";
import { faker } from "@faker-js/faker";
import fs from "node:fs";

const LIMIT = {
  categories: 10,
  companies: 100
} as const;

const categoryIds = faker.helpers.uniqueArray(
  faker.database.mongodbObjectId,
  LIMIT.categories
);

const companyIds = faker.helpers.uniqueArray(
  faker.database.mongodbObjectId,
  LIMIT.companies
);

const categories = categoryIds.map(($oid): FakerCategory => {
  return {
    _id: { $oid },
    description: faker.lorem.paragraph(),
    name: faker.commerce.department(),
    tagline: faker.company.catchPhrase()
  };
});

const companies = companyIds.map(($oid, index): FakerCompany => {
  return {
    _id: { $oid },
    categories: faker.helpers.uniqueArray(
      categoryIds,
      faker.number.int({ max: 3, min: 1 })
    ),
    header: {
      assetId: faker.string.uuid(),
      height: 400,
      secureUrl: `https://picsum.photos/id/${index}/1600/400`,
      url: `http://picsum.photos/id/${index}/1600/400`,
      width: 1600
    },
    images: faker.helpers.uniqueArray(
      () => ({
        assetId: faker.string.uuid(),
        height: 900,
        secureUrl: `https://picsum.photos/id/${index}/1600/900`,
        url: `http://picsum.photos/id/${index}/1600/900`,
        width: 1600
      }),
      faker.number.int({ max: 5, min: 1 })
    ),
    logo: {
      assetId: faker.string.uuid(),
      height: 512,
      secureUrl: `https://picsum.photos/id/${index}/512/512`,
      url: `http://picsum.photos/id/${index}/512/512`,
      width: 512
    },
    name: faker.commerce.productName()
  };
});

// eslint-disable-next-line no-sync -- Ok
fs.writeFileSync(
  "assets/dummy/categories.json",
  // eslint-disable-next-line unicorn/no-null -- Ok
  JSON.stringify(categories, null, 2)
);

// eslint-disable-next-line no-sync -- Ok
fs.writeFileSync(
  "assets/dummy/companies.json",
  // eslint-disable-next-line unicorn/no-null -- Ok
  JSON.stringify(companies, null, 2)
);

interface FakerCategory extends Category {
  readonly _id: { readonly $oid: string };
}

interface FakerCompany extends Company {
  readonly _id: { readonly $oid: string };
}
