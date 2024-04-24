import zod from "zod";
export declare const CompanyValidationSchema: zod.ZodObject<{
    header: zod.ZodString;
    images: zod.ZodArray<zod.ZodString, "many">;
    logo: zod.ZodString;
    name: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    name: string;
    header: string;
    images: string[];
    logo: string;
}, {
    name: string;
    header: string;
    images: string[];
    logo: string;
}>;
export declare const CompanyUpdateValidationSchema: zod.ZodObject<{
    header: zod.ZodOptional<zod.ZodString>;
    images: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    logo: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    name?: string | undefined;
    header?: string | undefined;
    images?: string[] | undefined;
    logo?: string | undefined;
}, {
    name?: string | undefined;
    header?: string | undefined;
    images?: string[] | undefined;
    logo?: string | undefined;
}>;
//# sourceMappingURL=validation-schema.d.ts.map