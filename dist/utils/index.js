"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUndefinedProperties = exports.assertNotNull = exports.assertDefined = void 0;
/**
 * Asserts that a value is defined.
 * @param value - The value to check.
 * @returns The value if it is defined.
 * @throws An error if the value is undefined.
 */
function assertDefined(value) {
    if (value === undefined)
        throw new Error("Value is undefined");
    return value;
}
exports.assertDefined = assertDefined;
/**
 * Asserts that a value is not null.
 * @param value - The value to check.
 * @returns The value if it is not null.
 * @throws An error if the value is null.
 */
function assertNotNull(value) {
    if (value === null)
        throw new Error("Value is null");
    return value;
}
exports.assertNotNull = assertNotNull;
/**
 * Filters the undefined properties from an object.
 * @param obj - The object to filter.
 * @returns The object without the undefined properties.
 */
function filterUndefinedProperties(obj) {
    const result = { ...obj };
    for (const key in result) {
        // eslint-disable-next-line security/detect-object-injection -- Ok
        const value = result[key];
        if (value !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete,  security/detect-object-injection -- Ok
            delete result[key];
        }
    }
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
    return result;
}
exports.filterUndefinedProperties = filterUndefinedProperties;
//# sourceMappingURL=index.js.map