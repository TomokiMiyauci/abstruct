// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { LessThanValidator } from "./less_than.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("LessThanValidator", () => {
  it("is should be return true if input less than base", () => {
    assert(new LessThanValidator(1).is(0));
    assert(new LessThanValidator(1n).is(0n));

    assertFalse(new LessThanValidator(0).is(1));
  });

  it("should represent of", () => {
    assertEquals(new LessThanValidator(0).toString(), `less than 0`);
    assertEquals(new LessThanValidator("").toString(), `less than ""`);
  });
});
