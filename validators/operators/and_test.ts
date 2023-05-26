// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { AndValidator } from "./and.ts";
import { Validator } from "../../types.ts";
import {
  assertType,
  describe,
  InferValidator,
  IsExact,
  it,
} from "../../_dev_deps.ts";

// @ts-ignore it is for type only
// deno-lint-ignore no-explicit-any
const anyVal: Validator<any> = {};
const s1: Validator<unknown, string> = anyVal;
const s2: Validator<unknown, number> = anyVal;
const s3: Validator<unknown, Iterable<unknown>> = anyVal;
const s4: Validator<unknown, "a" | "b" | "c"> = anyVal;
const s5: Validator<unknown, "b"> = anyVal;
const s6: Validator<string, "a" | "b" | "c"> = anyVal;
const s7: Validator<string, "b"> = anyVal;
const s8: Validator<"a" | "b", "b"> = anyVal;
const s9: Validator<"a"> = anyVal;
const s10: Validator<"b"> = anyVal;
const s11: Validator<string, "a" | "b"> = anyVal;
const s12: Validator<string, "b" | "c"> = anyVal;

describe("AndValidator", () => {
  it("should accept same top-in sub-out", () => {
    const validator = AndValidator.create(s1, s1);

    assertType<
      IsExact<InferValidator<typeof validator>, Validator<unknown, string>>
    >(true);
  });

  it(`should accept same sub-in sub-out`, () => {
    const validator = AndValidator.create(s8, s8);

    assertType<
      IsExact<Validator<"a" | "b", "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should narrowed top-in sub-out`, () => {
    const validator = AndValidator.create(s3, s5);

    assertType<
      IsExact<Validator<unknown, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = AndValidator.create(s6, s7);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = AndValidator.create(s6, s7);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = AndValidator.create(s11, s12);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(
      true,
    );
  });

  it(`should infer out-never`, () => {
    const validator = AndValidator.create(s1, s2);

    assertType<
      IsExact<Validator<unknown, never>, InferValidator<typeof validator>>
    >(
      true,
    );
  });

  it(`should infer unknown -> "b"`, () => {
    const validator = AndValidator.create(s1, s6, s7);

    assertType<
      IsExact<Validator<unknown, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it("should infer string -> never", () => {
    const validator = AndValidator.create(s6, s7, s2);

    assertType<
      IsExact<Validator<string, never>, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer string -> "b"`, () => {
    const validator = AndValidator.create(s11, s12);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should not assign with 2 args`, () => {
    // @ts-expect-error s8 cannot assign.
    AndValidator.create(s4, s8);

    // @ts-expect-error s6 cannot assign.
    AndValidator.create(s3, s6);

    // @ts-expect-error s9 cannot assign.
    AndValidator.create(s8, s9);

    // @ts-expect-error s9 cannot assign.
    AndValidator.create(s9, s10);
  });

  it("should not assign with 3 args", () => {
    // @ts-expect-error s8 cannot assign.
    AndValidator.create(s6, s6, s8);

    // @ts-expect-error s9 cannot assign.
    AndValidator.create(s6, s7, s9);

    // @ts-expect-error s9 cannot assign.
    AndValidator.create(s8, s9, s10);
  });
});
