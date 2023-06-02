// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { IntegerValidator } from "./integer.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("IntegerValidator", () => {
  it("is should be return true if input is integer", () => {
    assert(new IntegerValidator().is(0));
    assert(new IntegerValidator().is(1));

    assertFalse(new IntegerValidator().is(1.1));
  });

  it("should represent of", () => {
    assertEquals(new IntegerValidator().toString(), "integer");
  });
});
