/**
 * Asserts that a value is defined.
 * @param value - The value to check.
 * @returns The value if it is defined.
 * @throws An error if the value is undefined.
 */
export declare function assertDefined<T>(value: T | undefined): T;
/**
 * Asserts that a value is not null.
 * @param value - The value to check.
 * @returns The value if it is not null.
 * @throws An error if the value is null.
 */
export declare function assertNotNull<T>(value: T | null): T;
/**
 * Filters the undefined properties from an object.
 * @param obj - The object to filter.
 * @returns The object without the undefined properties.
 */
export declare function filterUndefinedProperties<T>(obj: T): FilterUndefinedProperties<T>;
export type FilterUndefinedProperties<T> = {
    [K in keyof T]: undefined extends T[K] ? never : T[K];
};
//# sourceMappingURL=index.d.ts.map