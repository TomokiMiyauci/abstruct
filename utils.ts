// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.
// deno-lint-ignore-file no-explicit-any

import { Error } from "./constants.ts";
import { type Expectation, ValidationFailure } from "./types.ts";
import { interpolate, isBigint, isString } from "./deps.ts";

export function fromPath(
  failure: Readonly<ValidationFailure>,
  path: PropertyKey,
): ValidationFailure {
  const instancePath = [path, ...failure.instancePath];

  return { message: failure.message, instancePath };
}

export function fromMessage(
  failure: Readonly<ValidationFailure>,
  message: string,
): ValidationFailure {
  return {
    message: message || failure.message,
    instancePath: failure.instancePath,
  };
}
export function shouldBe(this: void): string {
  return interpolate(Error.ShouldBe, [print(this)]);
}

export function shouldBeBut(
  this: void,
  { input }: Readonly<{ input: unknown }>,
): string {
  return interpolate(Error.ShouldBeBut, [print(this), print(input)]);
}

/** Create instance */
export function createInst<Args extends readonly unknown[], R>(
  ctor: { new (...args: Args): R },
): (...args: Args) => R {
  return (...args) => new ctor(...args);
}

/** Return printable JavaScript data. */
export function print(input: unknown): string {
  const str = String(input);
  if (isString(input)) return `"${str}"`;
  if (isBigint(input)) return `${str}n`;

  return str;
}

/** Return printable properties.
 */
export function printProps(
  input: Readonly<Record<PropertyKey, unknown>>,
): string {
  const properties = entriesAll(input)
    .map(([key, value]) => `${key.toString()}: ${print(value)}`)
    .join(", ");

  return `{${properties}}`;
}

/** Returns an array of key/values of the all owned properties of an object
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
export function entriesAll<T>(
  obj: Readonly<Record<PropertyKey, T>>,
): [string | symbol, T][] {
  const result = Reflect
    .ownKeys(obj)
    .map((key) => [key, obj[key]] as [string | symbol, T]);

  return result;
}

export function Expectable<T extends NewableFunction, U>(
  ctor: T & {
    new (...args: any): { validate(input: U): Iterable<ValidationFailure> };
  },
) {
  class Expectable extends ctor implements Expectation<{ input: U }> {
    #messageFn?: (ctx: { input: U }) => string;
    expect(
      messageOrReport:
        | string
        | ((ctx: { input: U }) => string),
    ): this {
      const fn = isString(messageOrReport)
        ? (() => messageOrReport)
        : messageOrReport;

      this.#messageFn = fn;

      return this;
    }

    override *validate(input: U): Iterable<ValidationFailure> {
      for (const failure of super.validate(input)) {
        yield fromMessage(
          failure,
          this.#messageFn?.({ input }) || failure.message,
        );
      }
    }
  }

  return Expectable;
}

/** join by dot.  */
export function joinDot(...rest: readonly unknown[]): string {
  const str = rest
    .map(String)
    .join(".");

  return str;
}
