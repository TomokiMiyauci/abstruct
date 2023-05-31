// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ObjectValidator } from "./object.ts";
import { TypeValidator } from "./operators/typeof.ts";
import { ValidationFailure } from "../types.ts";
import { assertEquals, describe, it } from "../_dev_deps.ts";

describe("ObjectValidator", () => {
  it("validate should yield failures", () => {
    assertEquals(
      [...new ObjectValidator({ a: new TypeValidator("string") }).validate({
        a: 0,
      })],
      [new ValidationFailure("", { instancePath: ["a"] })],
    );

    assertEquals(
      [...new ObjectValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("function"),
      }).validate({
        a: 0,
        [Symbol.iterator]: "",
      })],
      [
        new ValidationFailure("", { instancePath: ["a"] }),
        new ValidationFailure("", {
          instancePath: [Symbol.iterator.toString()],
        }),
      ],
    );
  });

  it("should represent of", () => {
    assertEquals(
      new ObjectValidator({ a: new TypeValidator("string") }).toString(),
      "{a: string}",
    );
    assertEquals(
      new ObjectValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("number"),
      }).toString(),
      "{a: string, Symbol(Symbol.iterator): number}",
    );
  });
});
