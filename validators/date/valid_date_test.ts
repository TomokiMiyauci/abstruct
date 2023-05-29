// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ValidDateValidator } from "./valid_date.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("ValidDateValidator", () => {
  it("is should be return true if input is valid Date", () => {
    assert(new ValidDateValidator().is(new Date("2000/1/1")));

    assertFalse(new ValidDateValidator().is(new Date("invalid")));
  });

  it("should represent of", () => {
    assertEquals(new ValidDateValidator().toString(), "valid Date");
  });
});
