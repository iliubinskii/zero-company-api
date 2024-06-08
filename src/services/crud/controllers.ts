import type { CrudControllers, CrudService } from "../../types";
import {
  assertDefined,
  buildErrorResponse,
  wrapAsyncHandler
} from "../../utils";
import { ErrorCode } from "../../schema";
import type { Request } from "express";
import { StatusCodes } from "http-status-codes";
import type zod from "zod";

/**
 * Creates item controllers.
 * @param service - The service.
 * @param CreateValidationSchema - The create validation schema.
 * @param UpdateValidationSchema - The update validation schema.
 * @returns The item controllers.
 */
export function createCrudControllers<
  ITEM extends object,
  ITEM_UPDATE extends object
>(
  service: CrudService<ITEM, ITEM_UPDATE>,
  CreateValidationSchema: ValidationSchemaInterface<ITEM>,
  UpdateValidationSchema: ValidationSchemaInterface<ITEM_UPDATE>
): CrudControllers {
  return {
    addItem: wrapAsyncHandler(async (req, res) => {
      const item = CreateValidationSchema.safeParse(req.body, {}, req);

      if (item.success) {
        const addedItem = await service.addItem(item.data);

        if (addedItem) res.status(StatusCodes.CREATED).json(addedItem);
        else
          res
            .status(StatusCodes.CONFLICT)
            .json(buildErrorResponse(ErrorCode.AlreadyExists));
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidData, item.error));
    }),
    addItemGuaranteed: wrapAsyncHandler(async (req, res) => {
      const item = CreateValidationSchema.safeParse(req.body, {}, req);

      if (item.success) {
        const addedItem = await service.addItemGuaranteed(item.data);

        res.status(StatusCodes.CREATED).json(addedItem);
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidData, item.error));
    }),
    deleteItem: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const affectedRows = await service.deleteItem(id);

      res.json({ affectedRows });
    }),
    getItem: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const item = await service.getItem(id);

      if (item) res.json(item);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json(buildErrorResponse(ErrorCode.NotFound));
    }),
    updateItem: wrapAsyncHandler(async (req, res) => {
      const id = assertDefined(req.idParam);

      const item = UpdateValidationSchema.safeParse(req.body, {}, req);

      if (item.success) {
        const updatedItem = await service.updateItem(id, item.data);

        if (updatedItem) res.status(StatusCodes.OK).json(updatedItem);
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .json(buildErrorResponse(ErrorCode.NotFound));
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(buildErrorResponse(ErrorCode.InvalidData, item.error));
    })
  };
}

export interface ValidationSchemaInterface<T extends object> {
  readonly safeParse: (
    item: unknown,
    params: Partial<zod.ParseParams>,
    req: Request
  ) => zod.SafeParseSuccess<T> | zod.SafeParseError<unknown>;
}
