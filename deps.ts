// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export { isEmpty } from "https://deno.land/x/isx@1.3.1/iterable/is_empty.ts";
export { isNotEmpty } from "https://deno.land/x/isx@1.3.1/iterable/is_not_empty.ts";
export { isSingle } from "https://deno.land/x/isx@1.3.1/iterable/is_single.ts";
export { isNullable } from "https://deno.land/x/isx@1.3.1/is_nullable.ts";
export { isString } from "https://deno.land/x/isx@1.3.1/is_string.ts";
export { isBigint } from "https://deno.land/x/isx@1.3.1/is_bigint.ts";
export { isValidDate } from "https://deno.land/x/isx@1.3.1/date/is_valid_date.ts";
export { filterKeys } from "https://deno.land/std@0.187.0/collections/filter_keys.ts";
export { maxBy } from "https://deno.land/std@0.187.0/collections/max_by.ts";
export { default as escapeStringRegex } from "https://esm.sh/escape-string-regexp@5.0.0?pin=v122";

/** Whether the input is positive number or not.
 * @param input - Any numeric.
 */
export function isPositiveNumber(input: number | bigint): boolean {
  return input > 0;
}

/** Whether the input is negative number or not.
 * @param input - Any numeric.
 */
export function isNegativeNumber(input: number | bigint): boolean {
  return input < 0;
}

/** Whether the input is non-positive number or not. */
export function isNonPositiveNumber(input: number | bigint): boolean {
  return isNegativeNumber(input) || !input;
}

/** Whether the input is non-negative number or not. */
export function isNonNegativeNumber(input: number | bigint): boolean {
  return isPositiveNumber(input) || !input;
}

/** Constructor type. */
// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any) => any;

export type ToPredicate<F> = F extends (input: infer In) => boolean
  ? (input: In) => input is In
  : never;
