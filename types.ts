// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Validator API. */
export interface Validator<in In = unknown, out A extends In = In> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationFailure>;

  /** Whether the input is valid or not. */
  is: (input: In) => input is A;
}

/** Validation failure. */
export class ValidationFailure {
  /** The validation failure message. */
  message: string;

  /** The path to a part of the instance. */
  instancePath: PropertyKey[];

  constructor(
    message?: string,
    options?: Readonly<ValidationFailureOptions>,
  ) {
    this.message = message ?? "";
    this.instancePath = [...options?.instancePath ?? []];
  }
}

export interface ValidationFailureOptions {
  instancePath?: readonly PropertyKey[];
}

/** Validation context API. */
export interface ValidationContext<In = unknown> {
  /** The actual input. */
  input: In;
}

export interface Reporter<T = unknown> {
  expect(message: string): this;
  expect(report: (ctx: T) => string): this;
}
