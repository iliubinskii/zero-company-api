import type { RequestHandler } from "express";
import type mongoose from "mongoose";

export interface CrudControllers {
  readonly addItem: RequestHandler;
  readonly addItemGuaranteed: RequestHandler;
  readonly deleteItem: RequestHandler;
  readonly getItem: RequestHandler;
  readonly updateItem: RequestHandler;
}

export interface CrudService<ITEM extends object, ITEM_UPDATE extends object> {
  /**
   * Adds an item to the database.
   * @param item - The item to add.
   * @returns A promise that resolves when the item has been added.
   */
  readonly addItem: (item: ITEM) => Promise<ExistingItem<ITEM> | null>;
  /**
   * Adds an item to the database.
   * @param item - The item to add.
   * @returns A promise that resolves when the item has been added.
   */
  readonly addItemGuaranteed: (item: ITEM) => Promise<ExistingItem<ITEM>>;
  /**
   * Deletes an item from the database.
   * @param id - The ID of the item to delete.
   * @returns - A promise that resolves with the number of affected rows.
   */
  readonly deleteItem: (id: string) => Promise<number>;
  /**
   * Gets an item from the database.
   * @param id - The ID of the item to get.
   * @returns A promise that resolves with the item, or `undefined` if the item was not found.   *
   */
  readonly getItem: (id: string) => Promise<ExistingItem<ITEM> | null>;
  /**
   * Gets all items from the database.
   * @param id - The ID of the item to get.
   * @param item - The item to update.
   * @returns - A promise that resolves with all items in the database.
   */
  readonly updateItem: (
    id: string,
    item: ITEM_UPDATE
  ) => Promise<ExistingItem<ITEM> | null>;
}

export type ExistingItem<ITEM> = ITEM & {
  readonly _id: mongoose.Types.ObjectId;
};
