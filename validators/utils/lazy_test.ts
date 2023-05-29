// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { lazy } from "./lazy.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { ValidationFailure } from "../../types.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("lazy", () => {
  it("should return almost same validator", () => {
    const v = new TypeValidator("string");
    const validator = lazy(() => v);

    assertFalse(validator === v);
    assert(validator.is(""));
    assertEquals([...validator.validate(0)], [new ValidationFailure("")]);
    assertEquals(validator.toString(), "string");
  });
});
