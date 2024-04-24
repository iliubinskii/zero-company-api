import { Company } from "../schema";
import zod from "zod";
export declare const CompanyValidationSchema: zod.ZodObject<{
    categories: zod.ZodArray<zod.ZodString, "many">;
    header: zod.ZodString;
    images: zod.ZodArray<zod.ZodString, "many">;
    logo: zod.ZodString;
    name: zod.ZodString;
}, "strict", zod.ZodTypeAny, {
    name: string;
    categories: string[];
    header: string;
    images: string[];
    logo: string;
}, {
    name: string;
    categories: string[];
    header: string;
    images: string[];
    logo: string;
}>;
export declare const CompanyUpdateValidationSchema: zod.ZodObject<{
    categories: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    header: zod.ZodOptional<zod.ZodString>;
    images: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    logo: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodOptional<zod.ZodString>;
}, "strict", zod.ZodTypeAny, {
    name?: string | undefined;
    categories?: string[] | undefined;
    header?: string | undefined;
    images?: string[] | undefined;
    logo?: string | undefined;
}, {
    name?: string | undefined;
    categories?: string[] | undefined;
    header?: string | undefined;
    images?: string[] | undefined;
    logo?: string | undefined;
}>;
/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export declare function typeCheck(value: zod.infer<typeof CompanyValidationSchema>): Company;
//# sourceMappingURL=validation-schema.d.ts.map