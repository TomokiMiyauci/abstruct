// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  Reporter,
  ValidationContext,
  ValidationFailure,
  type Validator,
} from "../types.ts";
import { isEmpty } from "../deps.ts";

/** Validator constructor for scalar value. */
export abstract class ScalarValidator<In = unknown, A extends In = In>
  extends Reporter<ValidationContext<In>>
  implements Validator<In, A> {
  /** Whether the input is valid or not. */
  abstract is(input: In): input is A;

  /** Check the input and return message on error. */
  check(input: In): true | string {
    return this.is(input) || this.report({ input });
  }

  *validate(input: In): Iterable<ValidationFailure> {
    const result = this.check(input);

    if (result !== true) yield new ValidationFailure(result);
  }
}

export abstract class BasicValidator<In = unknown, A extends In = In>
  implements Validator<In, A> {
  is(input: In): input is A {
    return isEmpty(this.validate(input));
  }

  abstract validate(input: In): Iterable<ValidationFailure>;
}
