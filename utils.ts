// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Display, Reporter, ValidationFailure, Validator } from "./types.ts";
import { escapeStringRegex } from "./deps.ts";

export function display(repr: string) {
  // deno-lint-ignore no-explicit-any
  return function <C extends { new (...args: any): any }>(constructor: C) {
    return class extends constructor implements Display {
      toString(): string {
        return repr;
      }
    };
  };
}

/** Validator constructor for scalar value. */
export abstract class ScalarValidator<In = unknown, A extends In = In>
  extends Reporter<{ input: In }>
  implements Validator<In, A> {
  /** Whether the input is valid or not. */
  abstract is(input: In): input is A;

  /** Check the input and return message on error. */
  check(input: In): true | string {
    return this.is(input) || this.report({ input });
  }

  *validate(input: In): Iterable<ValidationFailure> {
    const result = this.check(input);

    if (result !== true) yield new ValidationFailure(result);
  }
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
  failure: ValidationFailure,
  path: string,
): ValidationFailure {
  const instancePath = [path, ...failure.instancePath];

  return new ValidationFailure(failure.message, { instancePath });
}

export function interpolate<
  T extends string,
  const U extends Delimiters = { prefix: "{"; suffix: "}" },
>(
  template: string,
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
