/* eslint-disable no-magic-numbers -- Ok */
/* eslint-disable no-sync -- Ok */

import type { Category, Company, Founder, User } from "../src";
import { CompanyStatus } from "../src";
import { dummy } from "../assets";
import { faker } from "@faker-js/faker";
import fs from "node:fs";

const BROKEN_IMAGES = new Set([86, 97]);

const LIMIT = { companies: 250 } as const;

const PRICE_STEP = 1000;

const companies = Array.from(
  { length: LIMIT.companies },
  (_, i): DummyCompany => {
    const targetValue = faker.number.int({ max: 1000, min: 100 }) * PRICE_STEP;

    return {
      _id: makeId(`50811f77bcf86cd79943${(i + 1).toString().padStart(4, "0")}`),
      categories: faker.helpers
        .uniqueArray(dummy.categories, faker.number.int({ max: 2, min: 1 }))
        .map(category => category._id),
      country: "us",
      createdAt: makeDate(faker.date.past()),
      description: faker.lorem.paragraph(),
      foundedAt: makeDate(faker.date.past()),
      founders: faker.helpers
        .uniqueArray(dummy.users, faker.number.int({ max: 3, min: 1 }))
        .map(({ email, firstName, lastName }): Founder => {
          return {
            email,
            name:
              typeof firstName === "string" && typeof lastName === "string"
                ? `${firstName} ${lastName}`
                : undefined,
            share:
              faker.number.float({ fractionDigits: 2, max: 0.1, min: 0.01 }) *
              targetValue *
              PRICE_STEP
          };
        }),
      images: faker.helpers.uniqueArray(
        () => {
          const index = getIndex();

          return {
            assetId: faker.string.hexadecimal({ length: 32 }),
            height: 900,
            name: `Image ${index}.jpg`,
            secureUrl: `https://picsum.photos/id/${index}/1600/900`,
            url: `http://picsum.photos/id/${index}/1600/900`,
            width: 1600
          };
        },
        faker.number.int({ max: 5, min: 1 })
      ),
      logo: (() => {
        const index = getIndex();

        return {
          assetId: faker.string.hexadecimal({ length: 32 }),
          height: 512,
          name: `Image ${index}.jpg`,
          secureUrl: `https://picsum.photos/id/${index}/512/512`,
          url: `http://picsum.photos/id/${index}/512/512`,
          width: 512
        };
      })(),
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
    function getIndex(): number {
      const result = faker.number.int({ max: 100, min: 1 });

      return BROKEN_IMAGES.has(result) ? getIndex() : result;
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

/**
 * Create a date object
 * @param date - The date
 * @returns The date object
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
function makeDate(date: Date) {
  return { $date: date.toISOString() } as const;
}

/**
 * Create an ObjectId
 * @param id - The id
 * @returns The ObjectId
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Ok
function makeId(id: string) {
  return { $oid: id } as const;
}

interface DummyCategory extends Category {
  readonly _id: DummyObjectId;
}

interface DummyCompany
  extends Omit<Company, "categories" | "createdAt" | "foundedAt" | "status"> {
  readonly _id: DummyObjectId;
  readonly categories: readonly DummyObjectId[];
  readonly createdAt: DummyDate;
  readonly foundedAt: DummyDate;
  readonly status: string;
}

interface DummyUser extends User {
  readonly _id: DummyObjectId;
}

interface DummyDate {
  readonly $date: string;
}

interface DummyObjectId {
  readonly $oid: string;
}
