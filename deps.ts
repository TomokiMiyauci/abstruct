// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

// TODO(miyauci): This module be external

export { isEmpty } from "https://deno.land/x/isx@1.4.0/iterable/is_empty.ts";
export { isNotEmpty } from "https://deno.land/x/isx@1.4.0/iterable/is_not_empty.ts";
export { isSingle } from "https://deno.land/x/isx@1.4.0/iterable/is_single.ts";
export { isNullable } from "https://deno.land/x/isx@1.4.0/is_nullable.ts";
export { isString } from "https://deno.land/x/isx@1.4.0/is_string.ts";
export { isBigint } from "https://deno.land/x/isx@1.4.0/is_bigint.ts";
export { isPositiveNumber } from "https://deno.land/x/isx@1.4.0/numeric/is_positive_number.ts";
export { isNonNegativeNumber } from "https://deno.land/x/isx@1.4.0/numeric/is_non_negative_number.ts";
export { isNegativeNumber } from "https://deno.land/x/isx@1.4.0/numeric/is_negative_number.ts";
export { isNonPositiveNumber } from "https://deno.land/x/isx@1.4.0/numeric/is_non_positive_number.ts";
export { isValidDate } from "https://deno.land/x/isx@1.4.0/date/is_valid_date.ts";
export { filterKeys } from "https://deno.land/std@0.187.0/collections/filter_keys.ts";
export { maxBy } from "https://deno.land/std@0.187.0/collections/max_by.ts";
import { escapeStringRegexp } from "https://deno.land/x/escape_string_regexp@v0.0.1/mod.ts";

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
    const escaped = escapeStringRegexp(`${prefix}${key}${suffix}`);
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

/** Return memoed function. */
export function memoize<A extends readonly unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  const cache = new Map<string, R>();

  return function (...args: A): R {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key)!;

    const value = fn(...args);

    cache.set(key, value);

    return value;
  };
}

/** Create right curried function. */
export function curryR<A0, A extends readonly unknown[], R>(
  fn: (...args: [...A, A0]) => R,
  arg0: A0,
): (...args: A) => R;
export function curryR<A0, A1, A extends readonly unknown[], R>(
  fn: (...args: [...A, A1, A0]) => R,
  arg0: A0,
  arg1: A1,
): (...args: A) => R;
export function curryR<AX, R>(
  fn: (...args: AX[]) => R,
  ...args: AX[]
): (...args: AX[]) => R {
  return function (...rest) {
    return fn(...rest, ...args.reverse());
  };
}

/** Constructor type. */
// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any) => any;

export type ToPredicate<F> = F extends (input: infer In) => boolean
  ? (input: In) => input is In
  : never;
