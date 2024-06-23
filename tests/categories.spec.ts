import { BASE_URL, JWT_ADMIN_EMAIL, JWT_SECRET } from "./config";
import { expect, test } from "@playwright/test";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

test.describe.parallel("Categories", () => {
  const token = jwt.sign({ email: JWT_ADMIN_EMAIL }, JWT_SECRET);

  test.describe("POST /", () => {
    const newCategoryData = {
      description: "This is a new category for testing.",
      name: "New",
      pinned: false,
      tagline: "Testing new category creation."
    };

    test("should create a new category", async ({ request }) => {
      const createResponse = await request.post(`${BASE_URL}/categories`, {
        data: newCategoryData,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      expect(createResponse.status()).toBe(StatusCodes.CREATED);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
      const responseBody = await createResponse.json();

      // eslint-disable-next-line no-warning-comments -- Ok
      // TODO: Use expect to check response body
      // eslint-disable-next-line no-console -- Temp
      console.log(responseBody);
    });
  });
});
