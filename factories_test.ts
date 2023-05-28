// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { eq, instance, type } from "./factories.ts";
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
    ];

    table.forEach(([message, expected]) => {
      assertEquals(message, expected);
    });
  });
});
