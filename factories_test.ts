// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { eq, gt, gte, instance, lt, lte, ne, not, type } from "./factories.ts";
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
    ];

    table.forEach(([message, expected]) => {
      assertEquals(message, expected);
    });
  });
});
