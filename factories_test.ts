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
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("default error message", () => {
  it("should be default error message as", () => {
    const table: [string, string][] = [
      [type("string").report({ input: 0 }), "should be string, but number"],
      [
        instance(Array).report({ input: "" }),
        "should be instance of Array, but String",
      ],
      [nullish.report({ input: "" }), `should be nullish, but ""`],
      [enumerator(1, 2).report({ input: 3 }), "should be 1 or 2, but 3"],
      [
        eq(0).report({ input: "abc" }),
        `should be 0, but "abc"`,
      ],
      [ne(0).report({ input: 0 }), "should be not 0, but 0"],
      [gt(0).report({ input: 0 }), "should be greater than 0, but 0"],
      [
        gte(1).report({ input: 0 }),
        "should be greater than or equal to 1, but 0",
      ],
      [lt(0).report({ input: 0 }), "should be less than 0, but 0"],
      [lte(1).report({ input: 0 }), "should be less than or equal to 1, but 0"],
      [between(4, 8).report({ input: 0 }), "should be between 4 and 8, but 0"],
      [
        not(eq(0)).report({ input: 0 }),
        "should be not 0, but 0",
      ],
      [has("").report({ input: {} }), `should has ""`],
      [and(string, string).expect("").report({ input: "" }), ""],
      [or(string, string).report({ input: "" }), "should be string or string"],
      [
        pattern(/^\d*$/).report({ input: "" }),
        `should be match pattern of \`/^\\d*$/\`, but ""`,
      ],
      [float.report({ input: 1 }), "should be float, but 1"],
      [int.report({ input: 1.1 }), "should be integer, but 1.1"],
      [positive.report({ input: 0 }), "should be positive number, but 0"],
      [
        nonNegative.report({ input: -1 }),
        "should be non-negative number, but -1",
      ],
      [negative.report({ input: 1 }), "should be negative number, but 1"],
      [
        nonPositive.report({ input: 1 }),
        "should be non-positive number, but 1",
      ],
      [
        validDate.report({ input: new Date("invalid") }),
        "should be valid Date",
      ],
      [count(5).report({ input: "" }), "should be 5 items, but 0"],
      [
        maxCount(5).report({ input: "abcdef" }),
        "item count should be less than or equal to 5, but 6",
      ],
      [
        minCount(5).report({ input: "a" }),
        "item count should be greater than or equal to 5, but 1",
      ],
      [single.report({ input: "" }), "should be single"],
      [empty.report({ input: "a" }), "should be empty"],
      [
        unique.report({ input: "aaa", item: "a", index: 1 }),
        "should be unique",
      ],
      [nonEmpty.report({ input: "" }), "should be non-empty"],
    ];

    table.forEach(([message, expected]) => {
      assertEquals(message, expected);
    });
  });
});
