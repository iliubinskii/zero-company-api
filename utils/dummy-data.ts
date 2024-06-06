/* eslint-disable no-magic-numbers -- Ok */
/* eslint-disable no-sync -- Ok */

import { type Category, type Company, CompanyStatus, type User } from "../src";
import { dummy } from "../assets";
import { faker } from "@faker-js/faker";
import fs from "node:fs";

const LIMIT = { companies: 250 } as const;

const PRICE_STEP = 1000;

const companies = Array.from(
  { length: LIMIT.companies },
  (_, i): DummyCompany => {
    const targetValue = faker.number.int({ max: 1000, min: 100 }) * PRICE_STEP;

    return {
      _id: {
        $oid: `50811f77bcf86cd79943${(i + 1).toString().padStart(4, "0")}`
      },
      categories: faker.helpers
        .uniqueArray(dummy.categories, faker.number.int({ max: 2, min: 1 }))
        .map(category => category._id.$oid),
      country: "us",
      createdAt: faker.date.recent().toISOString(),
      description: faker.lorem.paragraph(),
      foundedAt: faker.date.past().toISOString(),
      founders: faker.helpers
        .uniqueArray(dummy.users, faker.number.int({ max: 3, min: 1 }))
        .map(({ email, firstName, lastName }) => {
          return {
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
      privateCompany: faker.datatype.boolean({ probability: 0.1 }),
      recommended: faker.datatype.boolean({ probability: 0.9 }),
      status: CompanyStatus.founded,
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
  }
);

fs.writeFileSync("assets/dummy/companies.json", JSON.stringify(companies));

// Type check the category schema
((): DummyCategory[] => dummy.categories)();

// Type check the companies schema
((): DummyCompany[] => dummy.companies)();

// Type check the users schema
((): DummyUser[] => dummy.users)();

interface DummyCategory extends Category {
  readonly _id: { readonly $oid: string };
}

interface DummyCompany extends Omit<Company, "status"> {
  readonly _id: { readonly $oid: string };
  readonly status: string;
}

interface DummyUser extends User {
  readonly _id: { readonly $oid: string };
}
