// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export { isEmpty } from "https://deno.land/x/isx@1.3.1/iterable/is_empty.ts";
export { isNotEmpty } from "https://deno.land/x/isx@1.3.1/iterable/is_not_empty.ts";
export { isSingle } from "https://deno.land/x/isx@1.3.1/iterable/is_single.ts";
export { isNullable } from "https://deno.land/x/isx@1.3.1/is_nullable.ts";
export { isString } from "https://deno.land/x/isx@1.3.1/is_string.ts";
export { isPositiveNumber } from "https://deno.land/x/isx@1.3.1/number/is_positive_number.ts";
export { isNegativeNumber } from "https://deno.land/x/isx@1.3.1/number/is_negative_number.ts";
export { isNonPositiveNumber } from "https://deno.land/x/isx@1.3.1/number/is_non_positive_number.ts";
export { isNonNegativeNumber } from "https://deno.land/x/isx@1.3.1/number/is_non_negative_number.ts";
export { isValidDate } from "https://deno.land/x/isx@1.3.1/date/is_valid_date.ts";
export { filterKeys } from "https://deno.land/std@0.187.0/collections/filter_keys.ts";
export { maxBy } from "https://deno.land/std@0.187.0/collections/max_by.ts";
export { default as escapeStringRegex } from "https://esm.sh/escape-string-regexp@5.0.0?pin=v122";

// deno-lint-ignore no-explicit-any
export type Constructor = abstract new (...args: any) => any;

export type ToPredicate<F> = F extends (input: infer In) => boolean
  ? (input: In) => input is In
  : never;
