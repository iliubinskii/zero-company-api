/* eslint-disable import/no-internal-modules -- Ok */
/* eslint-disable no-sync -- Ok */

import { Company } from "../src/schema";
import categories from "../assets/dummy/categories.json";
import { faker } from "@faker-js/faker";
import fs from "node:fs";
import users from "../assets/dummy/users.json";

const LIMIT = {
  companies: 100
} as const;

const PRICE_STEP = 1000;

const companies = faker.helpers.uniqueArray((): Company => {
  const targetValue = faker.number.int({ max: 1000, min: 100 }) * PRICE_STEP;

  return {
    categories: faker.helpers
      .uniqueArray(categories, faker.number.int({ max: 2, min: 1 }))
      .map(category => category._id.$oid),
    description: faker.lorem.paragraph(),
    foundedAt: faker.date.past().toISOString(),
    founders: faker.helpers
      .uniqueArray(users, faker.number.int({ max: 3, min: 1 }))
      .map(({ email, firstName, lastName }) => {
        return {
          confirmed: true,
          email,
          firstName,
          lastName,
          share:
            faker.number.float({ fractionDigits: 2, max: 0.1, min: 0.01 }) *
            targetValue *
            PRICE_STEP
        };
      }),
    images: faker.helpers.uniqueArray(
      () => {
        return {
          assetId: faker.string.hexadecimal({ length: 32 }),
          height: 900,
          secureUrl: `https://picsum.photos/id/${index()}/1600/900`,
          url: `http://picsum.photos/id/${index()}/1600/900`,
          width: 1600
        };
      },
      faker.number.int({ max: 5, min: 1 })
    ),
    logo: {
      assetId: faker.string.hexadecimal({ length: 32 }),
      height: 512,
      secureUrl: `https://picsum.photos/id/${index()}/512/512`,
      url: `http://picsum.photos/id/${index()}/512/512`,
      width: 512
    },
    name: faker.commerce.productName(),
    recommended: true,
    targetValue,
    website: faker.internet.url()
  };

  /**
   * Generate a random index for the picsum photos
   * @returns The random index
   */
  function index(): number {
    return faker.number.int({ max: 100, min: 1 });
  }
}, LIMIT.companies);

fs.writeFileSync("assets/dummy/companies.json", JSON.stringify(companies));
