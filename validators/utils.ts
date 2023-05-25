// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

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
