// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  BasicValidator,
  defineScalarValidator,
  defineValidator,
  IsValidator,
  lazy,
  ScalarValidator,
} from "./utils.ts";
import { TypeValidator } from "./operators/typeof.ts";
import type { ValidationFailure } from "../types.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../_dev_deps.ts";

describe("lazy", () => {
  it("should return almost same validator", () => {
    const v = new TypeValidator("string");
    const validator = lazy(() => v);

    assertFalse(validator === v);
    assert(validator.is(""));
    assertEquals([...validator.validate(0)], [{
      message: "",
      instancePath: [],
    }]);
    assertEquals(validator.toString(), "string");
  });
});

describe("BasicValidator", () => {
  it("is should return false if validate yield", () => {
    class V extends BasicValidator {
      override *validate(): Iterable<ValidationFailure> {
        yield { message: "", instancePath: [] };
      }
    }

    assertFalse(new V().is(""));
  });

  it("is should return true if validate does not yield", () => {
    class V extends BasicValidator {
      override *validate(): Iterable<ValidationFailure> {
      }
    }

    assert(new V().is(""));
  });
});

describe("IsValidator", () => {
  it("validate should yield if is function return false", () => {
    class V extends IsValidator {
      override is(_: unknown): _ is unknown {
        return false;
      }
    }

    assertEquals([...new V().validate("")], [{
      message: "",
      instancePath: [],
    }]);
  });

  it("validate should not yield if is function return true", () => {
    class V extends IsValidator {
      override is(_: unknown): _ is unknown {
        return true;
      }
    }

    assertEquals([...new V().validate("")], []);
  });
});

describe("defineValidator", () => {
  it("should return validator", () => {
    const validate = () => [];
    const validator = defineValidator<string, "a" | "b">(validate);

    assert(validator.validate === validate);
    assert(validator.is(""));
  });
});

describe("ScalarValidator", () => {
  it("validate should yield if is function return string", () => {
    class V extends ScalarValidator {
      override check(): string | true {
        return "";
      }
    }

    assertFalse(new V().is(""));
    assertEquals([...new V().validate("")], [{
      message: "",
      instancePath: [],
    }]);
  });

  it("validate should not yield if is function return true", () => {
    class V extends ScalarValidator {
      override check(): string | true {
        return true;
      }
    }

    assert(new V().is(""));
    assertEquals([...new V().validate("")], []);
  });
});

describe("defineScalarValidator", () => {
  it("should return validator", () => {
    const check = () => true as const;
    const validator = defineScalarValidator<string, "a" | "b">(check);

    assert(validator.is(""));
    assertEquals([...validator.validate("")], []);
  });
});
