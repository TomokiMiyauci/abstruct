// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { CountValidator } from "./count.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("CountValidator", () => {
  it("is should be return true if input item count is matched", () => {
    assert(new CountValidator(1).is("a"));
    assert(new CountValidator(3).is([1, 2, 3]));

    assertFalse(new CountValidator(0).is("a"));
  });

  it("should represent of", () => {
    assertEquals(new CountValidator(1).toString(), "1 item");
    assertEquals(new CountValidator(2).toString(), "2 items");
  });
});
