// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ValidationFailure, type Validator } from "../types.ts";
import { isEmpty, memo } from "../deps.ts";

export abstract class IsValidator<In = unknown, RIn extends In = In>
  implements Validator<In, RIn> {
  abstract is(input: In): input is RIn;

  *validate(input: In): Iterable<ValidationFailure> {
    if (!this.is(input)) yield { message: "", instancePath: [] };
  }
}

/** Base validator.
 *
 * @example
 * ```ts
 * import {
 *   BasicValidator,
 * } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 *
 * class StringItemValidator
 *   extends BasicValidator<Iterable<unknown>, Iterable<string>> {
 *   *validate(input: Iterable<unknown>) {
 *     let i = 0;
 *
 *     for (const item of input) {
 *       if (typeof item !== "string") {
 *         yield {
 *           message: `should be string, actual ${typeof input}`,
 *           instancePath: [i++],
 *         };
 *       }
 *     }
 *   }
 * }
 * ```
 */
export abstract class BasicValidator<In = unknown, RIn extends In = In>
  implements Validator<In, RIn> {
  is(input: In): input is RIn {
    return isEmpty(this.validate(input));
  }

  abstract validate(input: In): Iterable<ValidationFailure>;
}

/** Create {@link Validator} from {@link Validator.validate}.
 *
 * @example
 * import { defineValidator } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 *
 * const StringValidator = defineValidator<unknown, string>(function* (input) {
 *  const typeOf = typeof input;
 *  if (typeOf !== "string") {
 *    yield { message: `should be string, actual ${typeOf}`, instancePath: [] };
 *  }
 * });
 */
export function defineValidator<In, RIn extends In = In>(
  validate: (input: In) => Iterable<ValidationFailure>,
): Validator<In, RIn> {
  const validator = new class extends BasicValidator<In, RIn> {
    validate = validate;
  }();

  return validator;
}

/** Base validator for scalar.
 *
 * @example
 * import { ScalarValidator } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 *
 * class StringValidator extends ScalarValidator<unknown, string> {
 *  check(input: unknown): true | string {
 *    const typeOf = typeof input;
 *
 *    return typeOf === "string" || `should be string, actual ${typeOf}`;
 *  }
 * }
 */
export abstract class ScalarValidator<In = unknown, RIn extends In = In>
  implements Validator<In, RIn> {
  /** Check the input and return validation result.
   * - `true`: The validation is success.
   * - `string`: Reason for validation fail.
   */
  abstract check(input: In): true | string;

  is(input: In): input is RIn {
    return this.check(input) === true;
  }

  *validate(input: In): Iterable<ValidationFailure> {
    const message = this.check(input);

    if (message !== true) yield { message, instancePath: [] };
  }
}

/** Create validator from {@link check} function.
 *
 * @example
 * ```ts
 * import { defineScalarValidator } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 *
 * const StringValidator = defineScalarValidator<unknown, string>((input) => {
 *  const typeOf = typeof input;
 *
 *  return typeOf === "string" || `should be string, actual ${typeOf}`;
 * });
 * ```
 */
export function defineScalarValidator<In = unknown, RIn extends In = In>(
  check: (input: In) => true | string,
): Validator<In, RIn> {
  const validator = new class extends ScalarValidator<In, RIn> {
    check = check;
  }();

  return validator;
}

/** Crate validator lazily.
 *
 * @example
 * ```ts
 * import { lazy } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const v: Validator;
 * const validator = lazy(() => v);
 * ```
 */
export function lazy<In, RIn extends In = In>(
  fn: () => Validator<In, RIn>,
): Validator<In, RIn> {
  const $fn = memo(fn);
  const validator = {
    is: (input: In): input is RIn => {
      return $fn().is(input);
    },
    *validate(input: In): Iterable<ValidationFailure> {
      yield* $fn().validate(input);
    },
    toString: (): string => {
      return $fn().toString();
    },
  };

  return validator;
}
