import zod from "zod";
export declare const CategoryValidationSchema: zod.ZodObject<{
    description: zod.ZodString;
    name: zod.ZodString;
    tagline: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
    description?: string | undefined;
    name?: string | undefined;
    tagline?: string | undefined;
}, {
    description?: string | undefined;
    name?: string | undefined;
    tagline?: string | undefined;
}>;
//# sourceMappingURL=validation-schema.d.ts.map