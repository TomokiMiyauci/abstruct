// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

// TODO(miyauci): Use [Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers) if supported.

import { isPositiveNumber } from "./deps.ts";

export function* map<T, V>(
  iterable: Iterable<T>,
  mapper: (item: T) => V,
): Iterable<V> {
  for (const value of iterable) {
    yield mapper(value);
  }
}

export function iter<T>(iterable: Iterable<T>): IteratorResult<T> {
  const iterator = iterable[Symbol.iterator]();
  const result = iterator.next();

  return result;
}

/** Take element from iterable.
 *
 * @throws {RangeError} If the {@link size} is not positive integer.
 */
export function* take<T>(
  iterable: Iterable<T>,
  size = Number.MAX_SAFE_INTEGER,
): Iterable<T> {
  if (!Number.isInteger(size) || !isPositiveNumber(size)) {
    throw new RangeError("size must be an positive integer");
  }

  for (const [i, value] of enumerate(iterable)) {
    yield value;

    if (size <= i + 1) break;
  }
}

/** Entries for iterable. */
export function* enumerate<T>(
  iterable: Iterable<T>,
  start = 0,
): Iterable<[index: number, item: T]> {
  for (const item of iterable) {
    yield [start++, item];
  }
}

/** Return item count. */
export function getCount(input: Iterable<unknown>): number {
  return [...input].length;
}
