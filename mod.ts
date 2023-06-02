// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export {
  assert,
  type AssertOptions,
  Err,
  type MultiAssertOptions,
  Ok,
  type Result,
  type SingleAssertOptions,
  validate,
  type ValidateOptions,
  ValidationError,
  type ValidationErrorOptions,
} from "./validation.ts";
export {
  type Expectation,
  ValidationFailure,
  type ValidationFailureOptions,
  type Validator,
} from "./types.ts";
export {
  and,
  between,
  bigint,
  boolean,
  count,
  empty,
  enumerator,
  eq,
  fixedArray,
  float,
  gt,
  gte,
  has,
  instance,
  int,
  int16,
  int32,
  int8,
  item,
  lt,
  lte,
  maxCount,
  minCount,
  ne,
  negative,
  nonEmpty,
  nonNegative,
  nonPositive,
  not,
  nullish,
  number,
  object,
  optional,
  or,
  pattern,
  positive,
  propKey,
  propValue,
  single,
  string,
  symbol,
  type,
  uint16,
  uint32,
  uint8,
  unique,
  validDate,
} from "./bindings.ts";
export {
  BasicValidator,
  defineScalarValidator,
  defineValidator,
  lazy,
  ScalarValidator,
} from "./validators/utils.ts";
export { EnumValidator } from "./validators/enum.ts";
export { NullishValidator } from "./validators/nullish.ts";
export { RangeValidator } from "./validators/range.ts";
export { FixedArrayValidator } from "./validators/array/fixed_array.ts";
export { ValidDateValidator } from "./validators/date/valid_date.ts";
export { CountValidator } from "./validators/iterable/count.ts";
export { EmptyValidator } from "./validators/iterable/empty.ts";
export { ItemValidator } from "./validators/iterable/item.ts";
export { MaxCountValidator } from "./validators/iterable/max_count.ts";
export { MinCountValidator } from "./validators/iterable/min_count.ts";
export { NonEmptyValidator } from "./validators/iterable/non_empty.ts";
export { SingleValidator } from "./validators/iterable/single.ts";
export { UniqueValidator } from "./validators/iterable/unique.ts";
export { FloatValidator } from "./validators/number/float.ts";
export { IntegerValidator } from "./validators/number/integer.ts";
export { NegativeNumberValidator } from "./validators/numeric/negative_number.ts";
export { NonNegativeNumberValidator } from "./validators/numeric/non_negative_number.ts";
export { NonPositiveNumberValidator } from "./validators/numeric/non_positive_number.ts";
export { PositiveNumberValidator } from "./validators/numeric/positive_number.ts";
export { PropertiesValidator } from "./validators/object/properties.ts";
export { OptionalValidator } from "./validators/object/optional.ts";
export { PropertyValueValidator } from "./validators/object/property_value.ts";
export { PropertyKeyValidator } from "./validators/object/property_key.ts";
export { AndValidator } from "./validators/operators/and.ts";
export { EqualityValidator } from "./validators/operators/equality.ts";
export { GreaterThanValidator } from "./validators/operators/greater_than.ts";
export { GreaterThanOrEqualValidator } from "./validators/operators/greater_than_or_equal.ts";
export { InValidator } from "./validators/operators/in.ts";
export { InequalityValidator } from "./validators/operators/inequality.ts";
export { InstanceValidator } from "./validators/operators/instanceof.ts";
export { LessThanValidator } from "./validators/operators/less_than.ts";
export { LessThanOrEqualValidator } from "./validators/operators/less_than_or_equal.ts";
export { NotValidator } from "./validators/operators/not.ts";
export { OrValidator } from "./validators/operators/or.ts";
export { type TypeStr, TypeValidator } from "./validators/operators/typeof.ts";
export { PatternValidator } from "./validators/string/pattern.ts";
export { type Constructor } from "./deps.ts";
