import type { CrudService } from "../../types";
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

        return addedItem.toObject();
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

      return addedItem.toObject();
    },
    deleteItem: async id => {
      const Model = await getModel();

      const deletedCategory = await Model.findByIdAndDelete(id);

      return deletedCategory ? 1 : 0;
    },
    getItem: async id => {
      const Model = await getModel();

      const item = await Model.findById(id);

      return item ? item.toObject() : undefined;
    },
    updateItem: async (id, item) => {
      const Model = await getModel();

      const updatedCategory = await Model.findByIdAndUpdate(
        id,
        buildMongodbQuery(item),
        { new: true }
      );

      if (updatedCategory) return updatedCategory.toObject();

      return undefined;
    }
  };
}

export interface GetModel<ITEM extends object> {
  (): Promise<mongoose.Model<ITEM>>;
}
