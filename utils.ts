// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  Assert,
  Display,
  Reporter,
  ValidationError,
  Validator,
} from "./types.ts";
import { escapeStringRegex } from "./deps.ts";

export function display(repr: string): ClassDecorator {
  return function (constructor) {
    return class extends constructor implements Display {
      toString(): string {
        return repr;
      }
    };
  };
}

/** Validator constructor for scalar value. */
export abstract class ScalarValidator<In = unknown>
  extends Reporter<{ input: In }>
  implements Validator<In> {
  /** Whether the input is valid or not. */
  abstract is(input: In): boolean;

  /** Check the input and return message on error. */
  check(input: In): true | string {
    return this.is(input) || this.report({ input });
  }

  *validate(input: In): Iterable<ValidationError> {
    const result = this.check(input);

    if (result !== true) yield new ValidationError(result);
  }
}

/** Assertive validator constructor for scalar value. */
export abstract class AssertiveScalarValidator<
  In,
  In_ extends In,
> extends ScalarValidator<In> {
  /** Whether the {@link In} is {@link Out} or not. */
  abstract is(input: In): input is In_;
}

export interface AssertiveScalarValidator<In, In_>
  extends ScalarValidator<In>, Assert<In_> {}

export function format(input: string, ...placeholders: unknown[]): string {
  for (const [i, placeholder] of placeholders.entries()) {
    const pattern = new RegExp(`\\{${i}\\}`, "g");

    input = input.replace(pattern, `${placeholder}`);
  }

  return input;
}

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

export function fromPath(
  error: ValidationError,
  path: string,
): ValidationError {
  return new ValidationError(error.message, {
    cause: error.cause,
    instancePath: [path, ...error.instancePath],
  });
}

export function interpolate<
  T,
  const U extends Delimiters = { prefix: "{"; suffix: "}" },
>(
  template: string & T,
  placeholders: { [k in ParsePlaceholder<T, U>]: unknown },
  options?: U,
): string {
  const { prefix = "{", suffix = "}" } = options ?? {};

  return Object
    .entries(placeholders)
    .reduce<string>(reducer, template);

  function reducer(prev: string, [key, value]: [string, unknown]): string {
    const escaped = escapeStringRegex(`${prefix}${key}${suffix}`);
    const pattern = new RegExp(escaped, "g");

    return prev.replace(pattern, `${value}`);
  }
}

interface Delimiters {
  prefix: Primitive;
  suffix: Primitive;
}

type Primitive = string | number | bigint | boolean | null | undefined;

type ParsePlaceholder<T, U extends Partial<Delimiters>> = T extends
  `${string}${U["prefix"]}${infer P}${U["suffix"]}${infer R}`
  ? P | ParsePlaceholder<R, U>
  : never;
