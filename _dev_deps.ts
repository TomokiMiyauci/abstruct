// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.

import { Validator } from "./mod.ts";
export { describe, it } from "https://deno.land/std@0.186.0/testing/bdd.ts";
export {
  assert,
  assertEquals,
  assertFalse,
  assertIsError,
  assertMatch,
  assertRejects,
  assertThrows,
} from "https://deno.land/std@0.186.0/testing/asserts.ts";
export {
  type Assert,
  assertType,
  type Has,
  type IsExact,
} from "https://deno.land/std@0.186.0/testing/types.ts";
export {
  assertSpyCalls,
  spy,
  stub,
} from "https://deno.land/std@0.186.0/testing/mock.ts";

export type InferValidator<T> = T extends Validator<infer In, infer Out>
  ? Validator<In, Out>
  : never;
