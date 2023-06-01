// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ItemValidator } from "./item.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { ValidationFailure } from "../../types.ts";
import { assertEquals, describe, it } from "../../_dev_deps.ts";

describe("ItemValidator", () => {
  it("validate should yield", () => {
    const validator = new ItemValidator(new TypeValidator("string"));

    assertEquals([...validator.validate([0, false, 1n])], [
      new ValidationFailure("", { instancePath: [0] }),
      new ValidationFailure("", { instancePath: [1] }),
      new ValidationFailure("", { instancePath: [2] }),
    ]);
  });

  it("should represent of", () => {
    assertEquals(
      new ItemValidator(new TypeValidator("string")).toString(),
      "items(string)",
    );
  });
});
