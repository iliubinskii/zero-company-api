import { Categories, Category } from "../schema";
import { NextFunction, Request, Response } from "express";
export interface CategoriesService {
    /**
     * Adds a category to the database.
     * @param category - The category to add.
     * @returns A promise that resolves when the category has been added.
     */
    readonly addCategory: (category: Category) => Promise<Category | undefined>;
    /**
     * Deletes a category from the database.
     * @param id - The ID of the category to delete.
     * @returns A promise that resolves with the number of affected rows.
     */
    readonly deleteCategory: (id: string) => Promise<number>;
    /**
     * Gets all categories from the database.
     * @returns A promise that resolves with all categories in the database.
     */
    readonly getCategories: () => Promise<Categories>;
    /**
     * Gets a category from the database.
     * @param id - The ID of the category to get.
     * @returns A promise that resolves with the category, or `undefined` if the category was not found.
     */
    readonly getCategory: (id: string) => Promise<Category | undefined>;
    /**
     * Updates a category in the database.
     * @param id - The ID of the category to update.
     * @param category - The category data to update.
     * @returns A promise that resolves with the updated category, or `undefined` if the category was not found.
     */
    readonly updateCategory: (id: string, category: Category) => Promise<Category | undefined>;
}
export interface CategoryControllers {
    /**
     * Adds a category to the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     */
    addCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Deletes a category from the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     */
    deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Returns all categories from the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     */
    getCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Returns a category from the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     */
    getCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Updates a category in the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     */
    updateCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=categories.d.ts.map