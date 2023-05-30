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
import { default as escapeStringRegex } from "https://esm.sh/escape-string-regexp@5.0.0?pin=v122";

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

/** Whether the input is in range. It is inclusive.
 * @throws {RangeError} If max less than to min.
 */
export function isInRange<T>(
  input: T,
  range: readonly [mix: T, max: T],
): boolean {
  const [min, max] = range;

  if (max < min) {
    throw new RangeError("max should be greater then or equal to min");
  }

  return min <= input && input <= max;
}

/** Interpolate JavaScript value to template. */
export function interpolate<
  T extends string,
  const U extends Delimiters = { prefix: "{"; suffix: "}" },
>(
  template: T,
  placeholders: { readonly [k in ParsePlaceholder<T, U>]: unknown },
  options?: Readonly<U>,
): string {
  const { prefix = "{", suffix = "}" } = options ?? {};

  return Object
    .entries(placeholders)
    .reduce(reducer, template);

  function reducer(prev: string, [key, value]: [string, unknown]): string {
    const escaped = escapeStringRegex(`${prefix}${key}${suffix}`);
    const pattern = new RegExp(escaped, "g");

    return prev.replace(pattern, String(value));
  }
}

export interface Delimiters {
  prefix: Primitive;
  suffix: Primitive;
}

type Primitive = string | number | bigint | boolean | null | undefined;

export type ParsePlaceholder<
  T,
  U extends Partial<Delimiters>,
> = T extends `${string}${U["prefix"]}${infer P}${U["suffix"]}${infer R}`
  ? P | ParsePlaceholder<R, U>
  : never;

/** Constructor type. */
// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any) => any;

export type ToPredicate<F> = F extends (input: infer In) => boolean
  ? (input: In) => input is In
  : never;
