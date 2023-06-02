// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { INSTANCE_PATH } from "./constants.ts";
import { interpolate, isNotEmpty, isString } from "./deps.ts";
import { joinDot } from "./utils.ts";
import { type ValidationFailure, Validator } from "./types.ts";
import { take } from "./iter_utils.ts";

interface ErrorConfigs extends ErrorOptions {
  /** Error constructor. */
  error?: NewableFunction;

  /** Error message.  */
  message?: string;
}

/** Validation error configs. */
interface ValidationConfigs extends ErrorConfigs {
  /** Validation error constructor.
   * @default ValidationError
   */
  error?: { new (message?: string, options?: ErrorOptions): Error };
}

interface AggregationConfigs extends ErrorConfigs {
  /** Aggregation error constructor.
   * @default AggregateError
   */
  error?: {
    new (
      // deno-lint-ignore no-explicit-any
      errors: Iterable<any>,
      message?: string,
      options?: ErrorOptions,
    ): Error;
  };
}

/** Instance path info options. */
export interface PathInfoOptions {
  /** Whether to keep instance path information private.
   * - `true`: private.
   * - `false`: public.
   * @default false
   */
  private?: boolean;

  /** Instance path root name.
   *
   * @example `options`
   */
  rootName?: string;
}

/** Assert options. */
export interface AssertOptions {
  /** Validation error configs. */
  validation?: ValidationConfigs;

  /** Whether to perform the assertion fail slow or not.
   * - `true`: fail fast
   * - `false`: fail slow
   * @default false
   */
  failSlow?: boolean;

  /** Instance path info options. */
  pathInfo?: PathInfoOptions;
}

/** Single assert options. */
export interface SingleAssertOptions extends AssertOptions {
  failSlow?: false;
}

/** Aggregation error configs. */

/** Multiple assert options. */
export interface MultiAssertOptions extends AssertOptions, ValidateOptions {
  /** Aggregation error configs. */
  aggregation?: AggregationConfigs;

  failSlow: true;
}

/** Assert that the input passes validator.
 *
 * @example
 * ```ts
 * import {
 *  assert,
 *  number,
 *  props,
 *  string,
 *  ValidationError,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import {
 *  assertEquals,
 *  assertIsError,
 * } from "https://deno.land/std/testing/asserts.ts";
 *
 * const Profile = props({ name: string, age: number });
 *
 * try {
 *  assert(Profile, { name: null, age: null });
 * } catch (e) {
 *  assertIsError(e, ValidationError, "<string validation message>");
 * }
 * ```
 *
 * @throws {AggregateError} If assertion is fail.
 * @throws {ValidationError} If assertion is fail and {@link options.failFast} is true.
 * @throws {RangeError} If options.maxFailures is not positive integer.
 */
export function assert<In = unknown, RIn extends In = In>(
  validator: Readonly<Validator<In, RIn>>,
  input: In,
  options: Readonly<SingleAssertOptions | MultiAssertOptions> = {},
): asserts input is RIn {
  const {
    failSlow,
    validation = {},
    pathInfo = {},
  } = options;
  const maxFailures = failSlow ? options.maxFailures : 1;
  const result = validate(validator, input, { maxFailures });

  if (result.isOk()) return;

  const { error: VError = ValidationError } = validation;

  if (failSlow) {
    const errors = result.value.map(failure2Error).map(captured);
    const { aggregation = {} } = options;
    const ErrorsCtor = aggregation.error ?? AggregateError;
    const e = new ErrorsCtor(errors, aggregation.message, {
      cause: aggregation.cause,
    });

    throw captured(e);
  }

  const failure = result.value[0];
  const e = failure2Error(failure);

  throw captured(e);

  function failure2Error(
    { message, instancePath }: Readonly<ValidationFailure>,
  ): Error {
    message ||= validation.message ?? "";

    if (isString(pathInfo.rootName)) {
      instancePath.unshift(pathInfo.rootName);
    }

    if (!pathInfo.private && isNotEmpty(instancePath)) {
      const pathRepr = joinDot(...instancePath);

      message += "\n" + interpolate(INSTANCE_PATH, [pathRepr]);
    }

    return new VError(message, { cause: validation.cause, instancePath });
  }

  // deno-lint-ignore ban-types
  function captured<T extends Object>(error: T): T {
    Error.captureStackTrace(error, assert);

    return error;
  }
}

/** Validate options. */
export interface ValidateOptions {
  /** The maximum number of {@link ValidationFailure}.
   * It should be positive integer.
   * @default Number.MAX_SAFE_INTEGER
   */
  maxFailures?: number;
}

/** The `validate` executes the {@link Validator} and returns a {@link Result} type. If validation
 * succeeds, it returns {@link Ok}. If it fails, it returns {@link Err}.
 *
 * If {@link Ok}, the value after narrowing of the type is stored.
 *
 * @example
 * ```ts
 * import {
 *   fixedArray,
 *   number,
 *   string,
 *   validate,
 *   type ValidationFailure,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import type {
 *   Assert,
 *   Has,
 *   IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const Tuple = fixedArray(string, number);
 *
 * type doTest = Assert<
 *   Has<typeof Tuple, Validator<[unknown, unknown], [string, number]>>,
 *   true
 * >;
 *
 * const result = validate(Tuple, [0, ""]);
 * declare const failure: ValidationFailure;
 *
 * if (result.isOk()) {
 *   type doTest = Assert<IsExact<typeof result.value, [string, number]>, true>;
 * } else {
 *   assertEquals(result.value, [failure, failure]);
 * }
 *
 * ```
 *
 * ## maxFailures
 * The maximum number of {@link ValidationFailure}. It should be positive integer.
 * The default is `Number.MAX_SAFE_INTEGER`.
 *
 * Example of fail fast:
 * ```ts
 * import {
 *   fixedArray,
 *   number,
 *   string,
 *   validate,
 *   type ValidationFailure,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import type {
 *   Assert,
 *   Has,
 *   IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const Tuple = fixedArray(string, number);
 * const result = validate(Tuple, [0, ""], { maxFailures: 1 });
 * declare const failure: ValidationFailure;
 *
 * if (result.isErr()) {
 *   assertEquals(result.value, [failure]);
 * }
 * ```
 *
 * Because the validator performs lazy evaluation, limiting the number of errors
 * improves performance.
 *
 * @throws {RangeError} If the {@link ValidateOptions.maxFailures} is not positive integer.
 */
export function validate<In = unknown, RIn extends In = In>(
  validator: Readonly<Validator<In, RIn>>,
  input: In,
  options: Readonly<ValidateOptions> = {},
): Result<RIn, [ValidationFailure, ...ValidationFailure[]]> {
  const failures = [...take(validator.validate(input), options.maxFailures)];

  if (isNotEmpty(failures)) return new Err(failures);

  return new Ok(input as RIn);
}

/** Validation error.
 *
 * @example
 * ```ts
 * import { ValidationError } from "https://deno.land/x/abstruct@$VERSION/validation.ts";
 *
 * const error = new ValidationError("<message>", {
 *   instancePath: ["a", "b", "c"],
 * });
 * ```
 */
export class ValidationError extends Error implements ValidationFailure {
  /** The path to a part of the instance. */
  instancePath: PropertyKey[];

  /** Error name. */
  override name = "ValidationError";

  constructor(
    message?: string,
    options: Readonly<ValidationErrorOptions> = {},
  ) {
    super(message, options);
    this.instancePath = options.instancePath ?? [];
  }
}

class Container<const T> {
  /** Actual value. */
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

/** Result of OK API. */
export class Ok<const T> extends Container<T> {
  /** Node type. */
  type: "ok" = "ok";

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<T> {
    return true;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err<never> {
    return false;
  }
}

/** Result of Error API. */
export class Err<const E> extends Container<E> {
  /** Node type. */
  type: "error" = "error";

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<never> {
    return false;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err<E> {
    return true;
  }
}

/** Represent either success({@link Ok}) or failure({@link Err}).  */
export type Result<T, E> = Ok<T> | Err<E>;

/** Validation error options. */
export interface ValidationErrorOptions extends ErrorOptions {
  /** Path to instance. */
  instancePath?: PropertyKey[];
}
