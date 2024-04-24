export interface Category {
    readonly description: string;
    readonly name: string;
    readonly tagline: string;
}
export type Categories = readonly Category[];
export interface ExistingCategory extends Category {
    readonly _id: {
        readonly $oid: string;
    };
}
//# sourceMappingURL=categories.d.ts.map