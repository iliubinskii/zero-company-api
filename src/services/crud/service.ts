import { buildMongodbQuery, toObject } from "../../utils";
import type { CrudService } from "../../types";
import { MONGODB_ERROR } from "../../consts";
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

        return toObject(addedItem);
      } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === MONGODB_ERROR.DUPLICATE_KEY
        )
          return undefined;

        throw err;
      }
    },
    addItemGuaranteed: async item => {
      const Model = await getModel();

      const model = new Model(item);

      const addedItem = await model.save();

      return toObject(addedItem);
    },
    deleteItem: async id => {
      const Model = await getModel();

      const deletedCategory = await Model.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getItem: async id => {
      const Model = await getModel();

      const item = await Model.findById(id);

      return item ? toObject(item) : undefined;
    },
    updateItem: async (id, item) => {
      const Model = await getModel();

      const updatedCategory = await Model.findByIdAndUpdate(
        id,
        buildMongodbQuery(item),
        { new: true }
      );

      if (updatedCategory) return toObject(updatedCategory);

      return undefined;
    }
  };
}

export interface GetModel<ITEM extends object> {
  (): Promise<mongoose.Model<ITEM>>;
}
