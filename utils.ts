// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Error } from "./constants.ts";
import { ValidationFailure } from "./types.ts";
import { interpolate, isBigint, isString } from "./deps.ts";

export function fromPath(
  failure: ValidationFailure,
  path: PropertyKey,
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
export function shouldBe(this: void): string {
  return interpolate(Error.ShouldBe, [print(this)]);
}

export function shouldBeBut(
  this: void,
  { input }: { input: unknown },
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
// deno-lint-ignore ban-types
export function printProps(input: {}): string {
  const properties = entriesAll(input)
    .map(([key, value]) => `${key.toString()}: ${print(value)}`)
    .join(", ");

  return `{${properties}}`;
}

/** Returns an array of key/values of the all owned properties of an object
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
export function entriesAll<T>(
  obj: { [k: PropertyKey]: T },
): [string | symbol, T][] {
  const keys = Object.keys(obj);
  const symbols = Object.getOwnPropertySymbols(obj);
  const result = (keys as (string | symbol)[])
    .concat(symbols)
    .map((key) => [key, obj[key]] as [string | symbol, T]);

  return result;
}
