// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ValidationFailure } from "./types.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("ValidationFailure", () => {
  it("should property as", () => {
    assertEquals(new ValidationFailure().message, "");
    assertEquals(new ValidationFailure().instancePath, []);
  });
});
