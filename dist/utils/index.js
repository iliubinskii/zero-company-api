"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotNull = exports.assertDefined = void 0;
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
//# sourceMappingURL=index.js.map