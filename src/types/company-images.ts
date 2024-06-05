import type { ExistingCompany, WebAccessibleImage } from "../schema";
import type { RequestHandler } from "express";

export interface CompanyImageControllers {
  readonly addImage: RequestHandler;
  readonly deleteImage: RequestHandler;
  readonly updateImage: RequestHandler;
}

export interface CompanyImagesMiddleware {
  readonly parseFormData: RequestHandler;
  webAccessibleStorage: RequestHandler;
}

export interface CompanyImagesService {
  /**
   * Add an image to a company
   * @param id - The ID of the company to add the image to.
   * @param image - The image to add.
   * @returns A promise that resolves with the company with the added image, or `undefined` if the company was not found.
   */
  readonly addImage: (
    id: string,
    image: WebAccessibleImage
  ) => Promise<ExistingCompany | undefined>;
  /**
   * Deletes an image from a company.
   * @param id - The ID of the company to delete the image from.
   * @param assetId - The ID of the image to delete.
   * @returns A promise that resolves with the company with the deleted image, or `undefined` if the company or image was not found.
   */
  readonly deleteImage: (id: string, assetId: string) => Promise<number>;
  /**
   * Updates an image for a company.
   * @param id - The ID of the company to update the image for.
   * @param assetId - The ID of the image to update.
   * @param image - The updated image data.
   * @returns A promise that resolves with the company with the updated image, or `undefined` if the company or image was not found.
   */
  readonly updateImage: (
    id: string,
    assetId: string,
    image: WebAccessibleImage
  ) => Promise<ExistingCompany | undefined>;
}
