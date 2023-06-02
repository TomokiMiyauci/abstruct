// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { GreaterThanOrEqualValidator } from "./greater_than_or_equal.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("GreaterThanOrEqualValidator", () => {
  it("is should be return true if input greater than or equal to base", () => {
    assert(new GreaterThanOrEqualValidator(0).is(1));
    assert(new GreaterThanOrEqualValidator(0).is(0));
    assert(new GreaterThanOrEqualValidator(0n).is(1n));

    assertFalse(new GreaterThanOrEqualValidator(1).is(0));
  });

  it("should represent of", () => {
    assertEquals(
      new GreaterThanOrEqualValidator(0).toString(),
      `greater than or equal to 0`,
    );
    assertEquals(
      new GreaterThanOrEqualValidator("").toString(),
      `greater than or equal to ""`,
    );
  });
});
