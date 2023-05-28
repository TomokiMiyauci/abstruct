// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { LessThanOrEqualValidator } from "./less_than_or_equal.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("LessThanOrEqualValidator", () => {
  it("is should be return true if input less than or equal to base", () => {
    assert(new LessThanOrEqualValidator(1).is(0));
    assert(new LessThanOrEqualValidator(0).is(0));
    assert(new LessThanOrEqualValidator(1n).is(0n));

    assertFalse(new LessThanOrEqualValidator(0).is(1));
  });

  it("should represent of", () => {
    assertEquals(
      new LessThanOrEqualValidator(0).toString(),
      `less than or equal to 0`,
    );
    assertEquals(
      new LessThanOrEqualValidator("").toString(),
      `less than or equal to ""`,
    );
  });
});
