// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  between,
  count,
  empty,
  eq,
  float,
  gt,
  gte,
  instance,
  int,
  lt,
  lte,
  ne,
  negative,
  nonNegative,
  nonPositive,
  not,
  nullish,
  pattern,
  positive,
  type,
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
      [empty.report({ input: "a" }), "should be empty"],
    ];

    table.forEach(([message, expected]) => {
      assertEquals(message, expected);
    });
  });
});
