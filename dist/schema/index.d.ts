import { Category } from "./categories";
import { Company } from "./companies";
export * from "./categories";
export * from "./companies";
declare module "express-serve-static-core" {
    interface Request {
        customCategory?: Category;
        customCategoryUpdate?: Partial<Category>;
        customCompany?: Company;
        customCompanyUpdate?: Partial<Company>;
    }
}
//# sourceMappingURL=index.d.ts.map