// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { MaxCountValidator } from "./max_count.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("MaxCountValidator", () => {
  it("is should be return true if items count is less than or equal to limit", () => {
    assert(new MaxCountValidator(3).is("a"));
    assert(new MaxCountValidator(3).is([1, 2, 3]));

    assertFalse(new MaxCountValidator(1).is("ab"));
  });

  it("should represent of", () => {
    assertEquals(new MaxCountValidator(1).toString(), "max items(1)");
  });
});
