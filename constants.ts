// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export const enum Error {
  ShouldBeBut = "should be {0}, but {1}",
  ShouldBe = "should be {0}",
  MaxCount = "item count should be less than or equal to {0}, but {1}",
  MinCount = "item count should be greater than or equal to {0}, but {1}",
  Unique = "item(0) should be unique",
}

export const enum Int8Range {
  Bottom = -127,
  Upper = 128,
}

export const enum Int16Range {
  Bottom = -32768,
  Upper = 32767,
}

export const enum Int32Range {
  Bottom = -2147483648,
  Upper = 2147483647,
}

export const enum UnsignedUpper {
  Uint8 = 255,
  Uint16 = 65535,
  Unit32 = 4294967295,
}
