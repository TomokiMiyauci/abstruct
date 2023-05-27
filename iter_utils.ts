// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

// TODO(miyauci): Use [Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers) if supported.

import { isPositiveNumber } from "./deps.ts";

/**
 * Returns an iterator that computes the given mapper function using arguments
 * from each of the iterables.
 */
export function* map<T, V>(
  iterable: Readonly<Iterable<T>>,
  mapper: (item: T) => V,
): Iterable<V> {
  for (const value of iterable) {
    yield mapper(value);
  }
}

/** Returns an iterator object for the given iterable. */
export function iter<T>(iterable: Readonly<Iterable<T>>): Iterator<T> {
  return iterable[Symbol.iterator]();
}

/** Take element from iterable.
 *
 * @throws {RangeError} If the {@link limit} is not positive integer.
 */
export function* take<T>(
  iterable: Readonly<Iterable<T>>,
  limit = Number.MAX_SAFE_INTEGER,
): Iterable<T> {
  if (!isPositiveInteger(limit)) {
    throw new RangeError("limit must be an positive integer");
  }

  for (const [i, value] of enumerate(iterable)) {
    yield value;

    if (limit <= i + 1) break;
  }
}

/** Entries for iterable. */
export function* enumerate<T>(
  iterable: Readonly<Iterable<T>>,
  start = 0,
): Iterable<[index: number, item: T]> {
  for (const item of iterable) {
    yield [start++, item];
  }
}

/** Return item count. */
export function getCount(input: Readonly<Iterable<unknown>>): number {
  return [...input].length;
}

/** Whether the input is positive integer or not. */
export function isPositiveInteger(input: number): boolean {
  return Number.isInteger(input) && isPositiveNumber(input);
}
