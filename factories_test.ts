// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  and,
  between,
  count,
  empty,
  enumerator,
  eq,
  float,
  gt,
  gte,
  has,
  instance,
  int,
  lt,
  lte,
  maxCount,
  minCount,
  ne,
  negative,
  nonEmpty,
  nonNegative,
  nonPositive,
  not,
  nullish,
  or,
  pattern,
  positive,
  single,
  string,
  type,
  unique,
  validDate,
} from "./factories.ts";
import { ValidationFailure } from "./types.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("default error message", () => {
  it("should return validation failure with default message", () => {
    const table: [Iterable<ValidationFailure>, string][] = [
      [type("string").validate(0), "should be string, but number"],
      [
        instance(Array).validate(""),
        "should be instance of Array, but String",
      ],
      [
        instance(Array).validate(undefined),
        "should be instance of Array, but undefined",
      ],
      [
        eq(0).validate("abc"),
        `should be 0, but "abc"`,
      ],
      [ne(0).validate(0), "should be not 0, but 0"],
      [gt(0).validate(0), "should be greater than 0, but 0"],
      [
        gte(1).validate(0),
        "should be greater than or equal to 1, but 0",
      ],
      [lt(0).validate(0), "should be less than 0, but 0"],
      [lte(1).validate(2), "should be less than or equal to 1, but 2"],
      [
        not(eq(0)).validate(0),
        "should be not 0, but 0",
      ],
      [has("").validate({}), `should has ""`],
      [or(string, string).validate(0), "should be string or string"],
      [float.validate(1), "should be float, but 1"],
      [int.validate(1.1), "should be integer, but 1.1"],
      [positive.validate(0), "should be positive number, but 0"],
      [
        nonNegative.validate(-1),
        "should be non-negative number, but -1",
      ],
      [negative.validate(1), "should be negative number, but 1"],
      [
        nonPositive.validate(1),
        "should be non-positive number, but 1",
      ],
      [
        validDate.validate(new Date("invalid")),
        "should be valid Date",
      ],
      [count(5).validate(""), "should be 5 items, but 0"],
      [
        maxCount(5).validate("abcdef"),
        "item count should be less than or equal to 5, but 6",
      ],
      [
        minCount(5).validate("a"),
        "item count should be greater than or equal to 5, but 1",
      ],
      [single.validate(""), "should be single"],
      [empty.validate("a"), "should be empty"],
      [nonEmpty.validate(""), "should be non-empty"],
      [enumerator(1, 2).validate(3), "should be 1 or 2, but 3"],
      [and(string, string).expect("override").validate(0), "override"],
      [nullish.validate(""), `should be nullish, but ""`],
      [
        pattern(/^\d+$/).validate(""),
        `should be match pattern of \`/^\\d+$/\`, but ""`,
      ],
      [between(4, 8).validate(0), "should be between 4 and 8, but 0"],
      [unique.validate("aa"), "should be unique"],
    ];

    table.forEach(([failures, message]) => {
      assertEquals([...failures].map(({ message }) => message), [message]);
    });
  });
});
