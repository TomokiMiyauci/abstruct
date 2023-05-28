// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { GreaterThanValidator } from "./greater_than.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("GreaterThanValidator", () => {
  it("is should be return true if input greater than base", () => {
    assert(new GreaterThanValidator(0).is(1));
    assert(new GreaterThanValidator(0n).is(1n));

    assertFalse(new GreaterThanValidator(1).is(0));
    assertFalse(new GreaterThanValidator({}).is({}));
  });

  it("should represent of", () => {
    assertEquals(new GreaterThanValidator(0).toString(), `greater than 0`);
    assertEquals(new GreaterThanValidator("").toString(), `greater than ""`);
  });
});
