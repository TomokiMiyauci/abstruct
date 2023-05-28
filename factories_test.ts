// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { type } from "./factories.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("type", () => {
  it("should be error message of", () => {
    assertEquals(
      type("string").report({ input: 0 }),
      "should be string, but number",
    );
  });
});
