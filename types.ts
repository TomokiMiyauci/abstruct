// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Validator API. */
export interface Validator<In = unknown> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationError>;
}

/** Assert API for validated data type. */
export interface Assert<In = unknown, Out extends In = In> {
  [Assert.symbol]: Out;
}

export class Assert {
  static readonly symbol = Symbol("assert.type");
}

export interface AssertiveValidator<In = unknown, Out extends In = In>
  extends Assert<In, Out>, Validator<In> {}

/** Validation error options. */
export interface ValidationErrorOptions extends ErrorOptions {
  /** Path to instance. */
  instancePath?: string[];
}

/** Validation error. */
export class ValidationError extends Error {
  /** The path to a part of the instance. */
  instancePath: string[];

  override name = "ValidationError";

  constructor(
    message?: string,
    options: ValidationErrorOptions = {},
  ) {
    super(message, options);
    this.instancePath = options.instancePath ?? [];
  }
}

/** Result of OK API. */
export class Ok<T> {
  /** Node type. */
  type: "ok" = "ok";

  /** Actual data. */
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

/** Result of Error API. */
export class Err {
  /** Node type. */
  type: "error" = "error";

  /** Actual errors. */
  errors: readonly ValidationError[];

  constructor(errors: readonly ValidationError[]) {
    this.errors = errors;
  }
}

/** Represent {@link Ok} or {@link Err}.  */
export type Result<T> = Ok<T> | Err;
