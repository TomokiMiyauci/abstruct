// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

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
