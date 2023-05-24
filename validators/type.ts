// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Display } from "../types.ts";
import { interpolate, ScalarValidator } from "../utils.ts";
import error from "./error.json" assert { type: "json" };

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

export interface TypeMap extends LegacyTypeMap {
  // deno-lint-ignore ban-types
  object: object;
  null: null;
}

export type Type = keyof TypeMap;

export class TypeValidator<T extends Type>
  extends ScalarValidator<unknown, TypeMap[T]> {
  constructor(public of: T) {
    super();
    super.expect(message);
  }

  override is(input: unknown): input is TypeMap[T] {
    return typeOf(input) === this.of;
  }

  override toString(): string {
    return `type of ${this.of}`;
  }
}

/** Strict {@link typeof} operation. */
export function typeOf(input: unknown): Type {
  const of = typeof input;

  if (of === "object" && input === null) return "null";

  return of;
}

export function message(this: Display, { input }: { input: unknown }): string {
  return interpolate(error.should_be_but, [this, typeof input]);
}
