// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Validator API. */
export interface Validator<In = unknown, RIn extends In = In> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationFailure>;

  /** Whether the input is valid or not. */
  is: (input: In) => input is RIn;
}

/** Validation failure. */
export interface ValidationFailure {
  /** The validation failure message. */
  message: string;

  /** The path to a part of the instance. */
  instancePath: PropertyKey[];
}

/** Binding message API. */
export interface Expectation<T = unknown> {
  /** Reserve message to be.  */
  expect(message: string): this;

  /** Reserve dynamic message to be.  */
  expect(report: (context: T) => string): this;
}
