// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ItemValidator } from "./item.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { assertEquals, describe, it } from "../../_dev_deps.ts";

describe("ItemValidator", () => {
  it("should represent of", () => {
    assertEquals(
      new ItemValidator(new TypeValidator("string")).toString(),
      "items(string)",
    );
  });
});
