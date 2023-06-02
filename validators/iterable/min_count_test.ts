// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { MinCountValidator } from "./min_count.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("MinCountValidator", () => {
  it("is should be return true if items count is greater than or equal to limit", () => {
    assert(new MinCountValidator(3).is("abc"));
    assert(new MinCountValidator(3).is([1, 2, 3, 4]));

    assertFalse(new MinCountValidator(3).is("ab"));
  });

  it("should represent of", () => {
    assertEquals(new MinCountValidator(1).toString(), "min items(1)");
  });
});
