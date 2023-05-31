// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { OptionalValidator } from "./optional.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { ValidationFailure } from "../../types.ts";
import { assertEquals, describe, it } from "../../_dev_deps.ts";

describe("OptionalValidator", () => {
  it("validate should yield failures", () => {
    assertEquals(
      [...new OptionalValidator({ a: new TypeValidator("string") }).validate({
        a: 0,
      })],
      [new ValidationFailure("", { instancePath: ["a"] })],
    );

    assertEquals(
      [...new OptionalValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("function"),
      }).validate({})],
      [],
    );
  });

  it("should represent of", () => {
    assertEquals(
      new OptionalValidator({ a: new TypeValidator("string") }).toString(),
      "optional {a: string}",
    );
    assertEquals(
      new OptionalValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("number"),
      }).toString(),
      "optional {a: string, Symbol(Symbol.iterator): number}",
    );
  });
});
