// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isString } from "./deps.ts";

/** Validator API. */
export interface Validator<in In = unknown> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationError>;
}

export type Validation<In = unknown, In_ extends In = In> = In extends In_
  ? Validator<In>
  : AssertiveValidator<In, In_>;

export interface Display {
  toString(): string;
}

export interface Transformer<in In = unknown, out Out = In> {
  transform: (input: In) => Out;
}

/** Assert API for validated data type. */
export interface Assert<T = unknown> {
  [Assert.symbol]: T;
}

export class Assert {
  static readonly symbol: unique symbol;
}

export interface AssertiveValidator<In = unknown, In_ extends In = In>
  extends Validator<In>, Assert<In_> {}

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

export interface Reporter<T = unknown> {
  report(context: T): string;

  expect(message: string): this;
  expect(report: Reporter["report"]): this;
}

export class Reporter<T = unknown> {
  #messageFn?: Reporter<T>["report"];

  report(context: T): string {
    return this.#messageFn?.(context) ?? "";
  }

  expect(messageOrReport: string | Reporter<T>["report"]): this {
    const fn = isString(messageOrReport)
      ? (() => messageOrReport) as Reporter<T>["report"]
      : messageOrReport;

    this.#messageFn = fn;

    return this;
  }
}

/** Result of OK API. */
export class Ok<T = unknown> {
  /** Node type. */
  type: "ok" = "ok";

  /** Actual data. */
  data: T;

  constructor(data: T) {
    this.data = data;
  }

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<T> {
    return true;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err {
    return false;
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

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok {
    return false;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err {
    return true;
  }
}

/** Represent {@link Ok} or {@link Err}.  */
export type Result<T> = Ok<T> | Err;
