// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { FixedArrayValidator } from "./fixed_array.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { Validator } from "../../types.ts";
import {
  assertEquals,
  assertType,
  describe,
  InferValidator,
  IsExact,
  it,
} from "../../_dev_deps.ts";

// deno-lint-ignore no-explicit-any
const v: Validator<any> = {} as any;
const v1: Validator<unknown> = v;
const v2: Validator<string> = v;

const av1: Validator<unknown, string> = v;
const av2: Validator<string, ""> = v;

describe("FixedArrayValidator", () => {
  it("validate should yield failures if each item not pass", () => {
    const validator = new FixedArrayValidator(
      new TypeValidator("string"),
      new TypeValidator("number"),
    );
    const result = validator.validate([0, ""]);

    assertEquals([...result], [
      { message: "", instancePath: [0] },
      { message: "", instancePath: [1] },
    ]);
  });

  it("should represent of", () => {
    assertEquals(
      new FixedArrayValidator(
        new TypeValidator("string"),
        new TypeValidator("number"),
      ).toString(),
      "[string, number]",
    );
  });

  it("should infer empty tuple", () => {
    const v = new FixedArrayValidator();

    assertType<IsExact<InferValidator<typeof v>, Validator<[], []>>>(true);
  });

  it("should infer single validator", () => {
    const v = new FixedArrayValidator(v1);

    assertType<
      IsExact<InferValidator<typeof v>, Validator<[unknown], [unknown]>>
    >(true);
  });

  it("should infer single sub-type validator", () => {
    const v = new FixedArrayValidator(v2);

    assertType<
      IsExact<InferValidator<typeof v>, Validator<[string], [string]>>
    >(true);
  });

  it("should assign validator", () => {
    new FixedArrayValidator<[unknown]>(v1);
    new FixedArrayValidator<[unknown, unknown]>(v1, v1);
    new FixedArrayValidator<[string]>(v2);

    // @ts-expect-error should error if the argument is lacked.
    new FixedArrayValidator<[unknown, unknown]>(v1);

    // @ts-expect-error should error if the input is not satisfied.
    new FixedArrayValidator<[unknown]>(v2);
  });

  it("should assign validator", () => {
    const v1 = new FixedArrayValidator(av1);

    assertType<
      IsExact<InferValidator<typeof v1>, Validator<[unknown], [string]>>
    >(true);
    // @ts-expect-error it should error if the output is narrowing but the input is validator
    new FixedArrayValidator<[unknown], [string]>(v1);
  });

  it("should assign validator", () => {
    const v1 = new FixedArrayValidator(av1, av1);

    assertType<
      IsExact<
        InferValidator<typeof v1>,
        Validator<[unknown, unknown], [string, string]>
      >
    >(true);
  });

  it("should assign validator", () => {
    const v1 = new FixedArrayValidator(av2);

    assertType<IsExact<InferValidator<typeof v1>, Validator<[string], [""]>>>(
      true,
    );
  });

  it("should assign validator", () => {
    const v = new FixedArrayValidator(v1, v2, av1, av2);

    assertType<
      IsExact<
        InferValidator<typeof v>,
        Validator<
          [unknown, string, unknown, string],
          [unknown, string, string, ""]
        >
      >
    >(
      true,
    );
  });

  it("should assign validator", () => {
    new FixedArrayValidator<[unknown], [unknown]>(av1);
    new FixedArrayValidator<[string], [string]>(av1);
    new FixedArrayValidator<[unknown], [unknown]>(v1);
    new FixedArrayValidator<[string], [string]>(av2);
    new FixedArrayValidator<[string], [""]>(av2);

    // @ts-expect-error it should not assign if the output is not satisfied
    new FixedArrayValidator<[string], [""]>(av1);

    // @ts-expect-error it should not assign if the input is not satisfied
    new FixedArrayValidator<[unknown], [unknown]>(av2);

    // @ts-expect-error it should not assign if it is not assertive validator
    new FixedArrayValidator<[unknown], [string]>(v1);
  });
});
