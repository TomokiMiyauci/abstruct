// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Constructor } from "./deps.ts";
import {
  Assert,
  Err,
  Ok,
  Result,
  ValidationError,
  Validator,
} from "./types.ts";

/** Whether the {@link Result} is {@link Ok} or not. */
export function isOk<T>(result: Result<T>): result is Ok<T> {
  return result.type === "ok";
}

/** Whether the {@link Result} is {@link Err} or not. */
export function isErr(result: Result<unknown>): result is Err {
  return result.type === "error";
}

/** Expectation message API. */
export interface Expect {
  /** Error message. */
  message: string;

  /** Set expected message. */
  expect(message: string): this;
}

/** Class decorator for {@link Expect} mixin. */
function expect<T extends Constructor>(constructor: T) {
  abstract class Mixin extends constructor implements Expect {
    message = "";

    expect(message: string): this {
      this.message = message;

      return this;
    }
  }

  return Mixin;
}

/** Validator constructor for scalar value. */
@expect
export abstract class ScalarValidator<In = unknown> implements Validator<In> {
  /** Whether the input is valid or not. */
  abstract is(input: In): boolean;

  /** Check the input and return message on error. */
  check(input: In): true | string {
    return this.is(input) || this.message;
  }

  *validate(input: In): Iterable<ValidationError> {
    const result = this.check(input);

    if (result !== true) yield new ValidationError(result);
  }
}

// TODO(miyauci): remove on improve to class decorator in TypeScript type system.
export interface ScalarValidator extends Expect {}

/** Assertive validator constructor for scalar value. */
export abstract class AssertiveScalarValidator<
  In,
  Out extends In,
> extends ScalarValidator<In> {
  /** Whether the {@link In} is {@link Out} or not. */
  abstract is(input: In): input is Out;
}

export interface AssertiveScalarValidator<In, Out>
  extends ScalarValidator<In>, Assert<In, Out> {}
