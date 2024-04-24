import { Category } from "../schema";
import zod from "zod";
export declare const CategoryValidationSchema: zod.ZodObject<{
    description: zod.ZodString;
    name: zod.ZodString;
    tagline: zod.ZodString;
}, "strict", zod.ZodTypeAny, {
    description: string;
    name: string;
    tagline: string;
}, {
    description: string;
    name: string;
    tagline: string;
}>;
export declare const CategoryUpdateValidationSchema: zod.ZodObject<{
    description: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
    tagline: zod.ZodOptional<zod.ZodString>;
}, "strict", zod.ZodTypeAny, {
    description?: string | undefined;
    name?: string | undefined;
    tagline?: string | undefined;
}, {
    description?: string | undefined;
    name?: string | undefined;
    tagline?: string | undefined;
}>;
/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export declare function typeCheck(value: zod.infer<typeof CategoryValidationSchema>): Category;
//# sourceMappingURL=validation-schema.d.ts.map