// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";

interface LegacyTypeMap {
  bigint: bigint;
  boolean: boolean;
  // deno-lint-ignore ban-types
  function: Function;
  number: number;
  // deno-lint-ignore ban-types
  object: object | null;
  string: string;
  symbol: symbol;
  undefined: undefined;
}

/** Map for key and JavaScript data type. */
export interface TypeMap extends LegacyTypeMap {
  // deno-lint-ignore ban-types
  object: object;
  null: null;
}

/** String representation of JavaScript data type. */
export type TypeStr = keyof TypeMap;

/** Validator for JavaScript data type. It executes `typeof` like operator.
 * The difference with `typeof` operator is that `"object"` does not match `null`.
 *
 * @example
 * ```ts
 * import { TypeValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/typeof.ts";
 * const iterable =new TypeValidator("string").validate(0);
 * ```
 */
export class TypeValidator<RIn extends TypeStr>
  extends IsValidator<unknown, TypeMap[RIn]> {
  constructor(public of: RIn) {
    super();
  }

  override is(input: unknown): input is TypeMap[RIn] {
    return typeOf(input) === this.of;
  }

  override toString(): string {
    return `${this.of}`;
  }
}

/** Strict {@link typeof} operation. */
export function typeOf(operand: unknown): TypeStr {
  const of = typeof operand;

  if (of === "object" && operand === null) return "null";

  return of;
}
