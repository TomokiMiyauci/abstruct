// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Assert, Display } from "../types.ts";
import { AssertiveScalarValidator, format } from "../utils.ts";
import error from "./error.json" assert { type: "json" };

export type Type = keyof TypeMap;

export interface TypeMap {
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

export class TypeValidator<T extends Type>
  extends AssertiveScalarValidator<unknown, TypeMap[T]> {
  declare [Assert.symbol]: TypeMap[T];
  constructor(public of: T) {
    super();
    super.expect(message);
  }

  override is(input: unknown): input is TypeMap[T] {
    // deno-lint-ignore valid-typeof
    return typeof input === this.of;
  }

  toString(): string {
    return `type of ${this.of}`;
  }
}

export function message(this: Display, { input }: { input: unknown }): string {
  return format(error.should_be, this, typeof input);
}
