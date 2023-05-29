// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
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
  not,
  pattern,
  positive,
  type,
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
      [negative.report({ input: 1 }), "should be negative number, but 1"],
    ];

    table.forEach(([message, expected]) => {
      assertEquals(message, expected);
    });
  });
});
