// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { interpolate } from "../utils.ts";
import error from "./error.json" assert { type: "json" };
import type { Display } from "../types.ts";

export function displayOr(
  v1: unknown,
  v2: unknown,
  ...values: readonly unknown[]
): string;
export function displayOr(
  ...args: readonly [unknown, unknown, ...readonly unknown[]]
): string {
  const head = args.slice(0, -1);
  const last = args.slice(-1)[0];

  return head.join(", ") + " or " + last;
}

export function shouldBe(
  this: Display,
): string {
  return interpolate(error.should_be, [this]);
}

export function shouldBeBut(
  this: Display,
  { input }: { input: unknown },
): string {
  return interpolate(error.should_be_but, [this, input]);
}

/**
 * @throws {RangeError} If max less than or equal to min.
 */
export function isInRange<T>(
  input: T,
  range: readonly [mix: T, max: T],
): boolean {
  const [min, max] = range;

  if (max <= min) throw new RangeError("max should be greater then min");

  return min <= input && input <= max;
}
