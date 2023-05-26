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

declare const s1: Validator<unknown, string>;
declare const s2: Validator<unknown, number>;
declare const s3: Validator<unknown, Iterable<unknown>>;
declare const s4: Validator<unknown, "a" | "b" | "c">;
declare const s5: Validator<unknown, "b">;
declare const s6: Validator<string, "a" | "b" | "c">;
declare const s7: Validator<string, "b">;
declare const s8: Validator<"a" | "b", "b">;
declare const s9: Validator<"a">;
declare const s10: Validator<"b">;
declare const s11: Validator<string, "a" | "b">;
declare const s12: Validator<string, "b" | "c">;

describe("AndValidator", () => {
  it("should accept same top-in sub-out", () => {
    const validator = new AndValidator(s1, s1);

    assertType<
      IsExact<InferValidator<typeof validator>, Validator<unknown, string>>
    >(true);
  });

  it(`should accept same sub-in sub-out`, () => {
    const validator = new AndValidator(s8, s8);

    assertType<
      IsExact<Validator<"a" | "b", "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should narrowed top-in sub-out`, () => {
    const validator = new AndValidator(s3, s5);

    assertType<
      IsExact<Validator<unknown, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = new AndValidator(s6, s7);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = new AndValidator(s6, s7);

    assertType<
      IsExact<Validator<string, "b">, InferValidator<typeof validator>>
    >(true);
  });

  it(`should infer <unknown, "b">`, () => {
    const validator = new AndValidator(s11, s12);

    assertType<
      IsExact<
        Validator<string, "b">,
        InferValidator<typeof validator>
      >
    >(
      true,
    );
  });

  it(`should infer out-never`, () => {
    const validator = new AndValidator(s1, s2);

    assertType<
      IsExact<
        Validator<unknown, never>,
        InferValidator<typeof validator>
      >
    >(
      true,
    );
  });

  it(`should not assign`, () => {
    // @ts-expect-error s8 cannot assign.
    new AndValidator(s4, s8);

    // @ts-expect-error s9 cannot assign.
    new AndValidator(s8, s9);

    // @ts-expect-error s9 cannot assign.
    new AndValidator(s9, s10);
  });
});
