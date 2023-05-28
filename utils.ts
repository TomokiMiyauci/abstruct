// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Error } from "./constants.ts";
import {
  Display,
  Reporter,
  ValidationContext,
  ValidationFailure,
  Validator,
} from "./types.ts";
import { escapeStringRegex, isBigint, isString } from "./deps.ts";

/** Validator constructor for scalar value. */
export abstract class ScalarValidator<In = unknown, A extends In = In>
  extends Reporter<ValidationContext<In>>
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

export function fromMessage(
  failure: ValidationFailure,
  message: string,
): ValidationFailure {
  return new ValidationFailure(message || failure.message, {
    instancePath: failure.instancePath,
  });
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

export type ParsePlaceholder<
  T,
  U extends Partial<Delimiters>,
> = T extends `${string}${U["prefix"]}${infer P}${U["suffix"]}${infer R}`
  ? P | ParsePlaceholder<R, U>
  : never;

export function shouldBe(
  this: Display,
): string {
  return interpolate(Error.ShouldBe, [print(this)]);
}

export function shouldBeBut(
  this: Display,
  { input }: { input: unknown },
): string {
  return interpolate(Error.ShouldBeBut, [print(this), print(input)]);
}

export function bind<
  // deno-lint-ignore no-explicit-any
  C extends { new (...args: any): any },
  T extends InstanceType<C & { build: () => C }>,
>(
  ctor: C,
): T & { build: () => C } {
  const calls: [method: string | symbol, args: unknown[]][] = [];

  const base = Object.assign(ctor.prototype, {
    build: () =>
      class extends ctor {
        // deno-lint-ignore no-explicit-any
        constructor(...constructorParams: any) {
          super(...constructorParams);

          for (const [key, args] of calls) {
            if (isString(key)) {
              this[key](...args);
            }
          }
        }
      },
  });
  const proxy = new Proxy(base, {
    get: (target, prop) => {
      if (typeof target[prop] === "function") {
        if (prop === "build") return target[prop];

        return (...args: unknown[]) => {
          calls.push([prop, args]);

          return proxy;
        };
      }

      return target[prop];
    },
  });

  return proxy;
}

export function memoize<A extends readonly unknown[], R>(
  fn: (...args: A) => R,
): (...args: A) => R {
  const cache = new Map<string, R>();

  return function (...args: A): R {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key)!;

    const value = fn(...args);

    cache.set(key, value);

    return value;
  };
}

/** Convert constructor to function. */
export function ctorFn<Args extends readonly unknown[], R>(
  ctor: { new (...args: Args): R },
): (...args: Args) => R {
  return (...args) => new ctor(...args);
}

/** Crate validator lazily.  */
export function lazy<In, A extends In = In>(
  fn: () => Validator<In, A>,
): Validator<In, A> {
  const $fn = memoize(fn);
  const validator = {
    is: (input: In): input is A => {
      return $fn().is(input);
    },
    *validate(input: In): Iterable<ValidationFailure> {
      yield* $fn().validate(input);
    },
    toString(): string {
      return `${$fn()}`;
    },
  };

  return validator;
}

/** Return printable JavaScript data. */
export function print(input: unknown): string {
  const str = String(input);
  if (isString(input)) return `"${str}"`;
  if (isBigint(input)) return `${str}n`;

  return str;
}
