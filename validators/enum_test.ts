// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { EnumValidator } from "./enum.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../_dev_deps.ts";

describe("EnumValidator", () => {
  it("is should be return true if pattern matched", () => {
    assert(new EnumValidator(1, 2, 3, 4).is(3));

    assertFalse(new EnumValidator<"" | 0 | false>("", 0, false).is(1));
  });

  it("should represent of", () => {
    assertEquals(new EnumValidator(1, 2, 3).toString(), "1, 2, or 3");
  });
});
