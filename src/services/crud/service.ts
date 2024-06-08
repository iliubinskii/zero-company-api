import type { CrudService, ExistingItem } from "../../types";
import { MONGODB_ERROR } from "../../consts";
import { buildMongodbQuery } from "../../utils";
import type mongoose from "mongoose";

/**
 * Create a CRUD service
 * @param getModel - Function that returns a mongoose model
 * @returns A CRUD service
 */
export function createCrudService<
  ITEM extends object,
  ITEM_UPDATE extends object
>(getModel: GetModel<ITEM>): CrudService<ITEM, ITEM_UPDATE> {
  return {
    addItem: async item => {
      try {
        const Model = await getModel();

        const model = new Model(item);

        const addedItem = await model.save();

        return assertExistingItemNullable(addedItem);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === MONGODB_ERROR.DUPLICATE_KEY
        )
          return null;

        throw err;
      }
    },
    addItemGuaranteed: async item => {
      const Model = await getModel();

      const model = new Model(item);

      const addedItem = await model.save();

      return assertExistingItem(addedItem);
    },
    deleteItem: async id => {
      const Model = await getModel();

      const deletedCategory = await Model.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getItem: async id => {
      const Model = await getModel();

      const item = await Model.findById(id);

      return assertExistingItemNullable(item);
    },
    updateItem: async (id, item) => {
      const Model = await getModel();

      const updatedCategory = await Model.findByIdAndUpdate(
        id,
        buildMongodbQuery(item),
        { new: true }
      );

      return assertExistingItemNullable(updatedCategory);
    }
  };
}

export interface GetModel<ITEM extends object> {
  (): Promise<mongoose.Model<ITEM>>;
}

/**
 * Asserts that an item has a valid ObjectId.
 * @param item - The item to assert.
 * @returns The item with a valid ObjectId.
 */
function assertExistingItem<ITEM extends object>(
  item: ITEM
): ExistingItem<ITEM> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return item as ExistingItem<ITEM>;
}

/**
 * Asserts that an item has a valid ObjectId or is null.
 * @param item - The item to assert.
 * @returns The item with a valid ObjectId or null.
 */
function assertExistingItemNullable<ITEM extends object>(
  item: ITEM | null
): ExistingItem<ITEM> | null {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return item as ExistingItem<ITEM>;
}
