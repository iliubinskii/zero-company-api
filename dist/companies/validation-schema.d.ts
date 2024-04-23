import zod from "zod";
export declare const CompanyValidationSchema: zod.ZodObject<{
    name: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const CompanyUpdateValidationSchema: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
//# sourceMappingURL=validation-schema.d.ts.map