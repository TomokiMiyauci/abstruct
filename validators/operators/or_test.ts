// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { OrValidator } from "./or.ts";
import { TypeValidator } from "./typeof.ts";
import {
  assert,
  assertEquals,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "../../_dev_deps.ts";

describe("OrValidator", () => {
  it("is should return true if one of validator passed", () => {
    const v1 = new TypeValidator("string");
    const v2 = new TypeValidator("number");
    const validator = new OrValidator<unknown, string | number>(v1, v2);

    assert(validator.is("a"));
  });

  it("validate should yield one failure", () => {
    const v1 = new TypeValidator("string");
    const v2 = new TypeValidator("number");
    const validator = new OrValidator<unknown, string | number>(v1, v2);

    assertEquals([...validator.validate("a")].length, 0);
  });

  it("validate should yield one failure", () => {
    const v1 = new TypeValidator("string");
    const v2 = new TypeValidator("number");

    const v1_ = spy(v1, "validate");
    const v2_ = spy(v2, "validate");
    const validator = new OrValidator<unknown, string | number>(v1, v2);

    assertEquals([...validator.validate(true)].length, 1);
    assertSpyCalls(v1_, 1);
    assertSpyCalls(v2_, 1);
  });

  it("should report max length instance path of each failures", () => {
    const is = (_: unknown): _ is unknown => true;
    const validator = new OrValidator<unknown>({
      is,
      validate: () => [{ message: "test", instancePath: ["a", "b", "c"] }],
    }, {
      is,
      validate: () => [{ message: "test1", instancePath: ["a", "b"] }, {
        message: "test2",
        instancePath: ["a", "b", "c", "d"],
      }],
    });

    assertEquals([...validator.validate(true)], [
      { message: "", instancePath: ["a", "b", "c"] },
    ]);
  });

  it("should represent of", () => {
    const v1 = new TypeValidator("string");
    const v2 = new TypeValidator("number");
    assertEquals(
      new OrValidator<unknown, string | number>(v1, v2).toString(),
      `string or number`,
    );
    assertEquals(
      new OrValidator<unknown, string | number>(v1, v1, v2).toString(),
      `string, string, or number`,
    );
  });
});
