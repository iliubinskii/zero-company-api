import { expect, test } from "@playwright/test";
import { StatusCodes } from "http-status-codes";

test.describe.parallel("API Testing", () => {
  // eslint-disable-next-line no-warning-comments -- Ok
  // TODO: Take it from configuration
  const baseURL = "https://preview-api.zero-company.app";

  test("Get API status", async ({ request }) => {
    const response = await request.get(baseURL, {
      headers: { "Content-Type": "application/json" }
    });

    expect(response.status()).toBe(StatusCodes.OK);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
    const responseBody = await response.json();

    // eslint-disable-next-line no-warning-comments -- Ok
    // TODO: Use expect to check response body
    // eslint-disable-next-line no-console -- Temp
    console.log(responseBody);
  });
});
