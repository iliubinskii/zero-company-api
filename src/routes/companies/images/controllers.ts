/* eslint-disable sonarjs/no-all-duplicated-branches -- Temp */
/* eslint-disable @typescript-eslint/require-await -- Temp */
/* eslint-disable no-unused-expressions -- Temp */

import { CompanyImageControllers, CompanyImagesService } from "../../../types";
import { assertDefined, wrapAsyncHandler } from "../../../utils";
import { CompanyImageCreateValidationSchema } from "../../../schema";

// eslint-disable-next-line no-warning-comments -- Assigned to David
/*
TODO:
Implement
See /public/schema.todo.txt
Use sendResponse<Routes["/companies/{id}/images"]["..."]>
Use sendResponse<Routes["/companies/{id}/images/{assetId}"]["..."]>
Possible response codes: 200 OK, 404 Not found if company with `id` does not exist
*/

/**
 * Creates company controllers.
 * @param service - The companies service.
 * @returns The company controllers.
 */
export function createCompanyImageControllers(
  service: CompanyImagesService
): CompanyImageControllers {
  return {
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    addImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const company = CompanyImageCreateValidationSchema.safeParse(req.body);

      id;
      req;
      res;
      service;

      if (company.success) {
        // eslint-disable-next-line no-warning-comments -- Assigned to David
        // TODO: Use service
        // If service returns company respond with 200
        // If service returns undefined respond with 404
        // Use sendResponse<Routes["/companies/{id}/images"]["..."]>
        // Use company.data.image
      } else {
        // eslint-disable-next-line no-warning-comments -- Assigned to David
        // TODO: Respond with 400 Bad request
        // Use sendResponse<Routes["/companies/{id}/images"]["..."]>
        // Add company.error to response
      }
    }),
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    deleteImage: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      // eslint-disable-next-line no-warning-comments -- Assigned to David
      // TODO: Add middleware similar to requireIdParam and use req.assetIdParam
      const assetId = assertDefined(req.params["assetId"]);

      id;
      assetId;
      req;
      res;
      service;
    }),
    // eslint-disable-next-line no-warning-comments -- Assigned to David
    // TODO: Implement
    updateImage: wrapAsyncHandler(async (req, res) => {
      req;
      res;
      service;
    })
  };
}
