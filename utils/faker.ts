import { Category, Company, User } from "../src/schema";
import { faker } from "@faker-js/faker";
import fs from "node:fs";

const LIMIT = {
  categories: 10,
  companies: 100,
  users: 10
} as const;

const PRICE_STEP = 1000;

const categoryIds = faker.helpers.uniqueArray(
  faker.database.mongodbObjectId,
  LIMIT.categories
);

const companyIds = faker.helpers.uniqueArray(
  faker.database.mongodbObjectId,
  LIMIT.companies
);

const userEmails = faker.helpers.uniqueArray(faker.internet.email, LIMIT.users);

const categories = categoryIds.map(($oid): FakerCategory => {
  return {
    _id: { $oid },
    description: faker.lorem.paragraph(),
    name: faker.commerce.department(),
    tagline: faker.company.catchPhrase()
  };
});

const companies = companyIds.map(($oid, index): FakerCompany => {
  const targetValue = faker.number.int({ max: 1000, min: 100 }) * PRICE_STEP;

  return {
    _id: { $oid },
    categories: faker.helpers.uniqueArray(
      categoryIds,
      faker.number.int({ max: 2, min: 1 })
    ),
    description: faker.lorem.paragraph(),
    foundedAt: faker.date.past().toISOString(),
    founders: faker.helpers
      .uniqueArray(userEmails, faker.number.int({ max: 3, min: 1 }))
      .map(email => ({
        confirmed: true,
        email,
        share:
          faker.number.float({ fractionDigits: 2, max: 0.1, min: 0.01 }) *
          targetValue *
          PRICE_STEP
      })),
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
    name: faker.commerce.productName(),
    privateCompany: false,
    recommended: true,
    targetValue,
    website: faker.internet.url()
  };
});

const users = userEmails.map((email): User => {
  return {
    email,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
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

// eslint-disable-next-line no-sync -- Ok
fs.writeFileSync(
  "assets/dummy/users.json",
  // eslint-disable-next-line unicorn/no-null -- Ok
  JSON.stringify(users, null, 2)
);

interface FakerCategory extends Category {
  readonly _id: { readonly $oid: string };
}

interface FakerCompany extends Company {
  readonly _id: { readonly $oid: string };
}
