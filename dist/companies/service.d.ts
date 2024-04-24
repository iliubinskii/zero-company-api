/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CompaniesService } from "../types";
import { Company } from "../schema";
import mongoose, { InferSchemaType } from "mongoose";
/**
 * Creates a MongoDB service for companies.
 * @returns A MongoDB service for companies.
 */
export declare function createCompaniesService(): CompaniesService;
declare const Schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    categories: string[];
    header: string;
    images: string[];
    logo: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    categories: string[];
    header: string;
    images: string[];
    logo: string;
}>> & mongoose.FlatRecord<{
    name: string;
    categories: string[];
    header: string;
    images: string[];
    logo: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
/**
 * Type check
 * @param value - Value
 * @returns Value
 */
export declare function typeCheck(value: InferSchemaType<typeof Schema>): Company;
export {};
//# sourceMappingURL=service.d.ts.map