// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { PropertyValidator } from "./validators/property.ts";
import { RangeValidator } from "./validators/range.ts";
import { FixedArrayValidator } from "./validators/array/fixed_array.ts";
import { DictionaryValidator } from "./validators/object/dictionary.ts";
import { OptionalValidator } from "./validators/object/optional.ts";
import { NullishValidator } from "./validators/nullish.ts";
import { IntegerValidator } from "./validators/number/integer.ts";
import { PositiveNumberValidator } from "./validators/number/positive_number.ts";
import { PatternValidator } from "./validators/string/pattern.ts";
import { CountValidator } from "./validators/iterable/count.ts";
import { EmptyValidator } from "./validators/iterable/empty.ts";
import { ItemValidator } from "./validators/iterable/item.ts";
import { UniqueValidator } from "./validators/iterable/unique.ts";
import { MaxCountValidator } from "./validators/iterable/max_count.ts";
import { MinCountValidator } from "./validators/iterable/min_count.ts";
import { NonEmptyValidator } from "./validators/iterable/non_empty.ts";
import { SingleValidator } from "./validators/iterable/single.ts";
import { EqualityValidator } from "./validators/operators/eq.ts";
import { LessThenValidator } from "./validators/operators/lt.ts";
import { LessThenOrEqualValidator } from "./validators/operators/lte.ts";
import { GreaterThenValidator } from "./validators/operators/gt.ts";
import { GreaterThenOrEqualValidator } from "./validators/operators/gte.ts";
import { InequalityValidator } from "./validators/operators/inequality.ts";
import { InstanceValidator } from "./validators/operators/instanceof.ts";
import { AndValidator } from "./validators/operators/and.ts";
import { NotValidator } from "./validators/operators/not.ts";
import { OrValidator } from "./validators/operators/or.ts";
import { TypeValidator } from "./validators/operators/typeof.ts";
import { ValidDateValidator } from "./validators/date/valid_date.ts";

export const string = /* @__PURE__ */ new TypeValidator("string");
export const number = /* @__PURE__ */ new TypeValidator("number");
export const bigint = /* @__PURE__ */ new TypeValidator("bigint");
export const boolean = /* @__PURE__ */ new TypeValidator("boolean");
export const instance = /* @__PURE__ */ lazy(InstanceValidator);
export const type = /* @__PURE__ */ lazy(TypeValidator);
export const object = /* @__PURE__ */ lazy(DictionaryValidator);
export const optional = /* @__PURE__ */ lazy(OptionalValidator);
export const nullish = /* @__PURE__ */ new NullishValidator();
export const eq = /* @__PURE__ */ lazy(EqualityValidator);
export const lt = /* @__PURE__ */ lazy(LessThenValidator);
export const lte = /* @__PURE__ */ lazy(LessThenOrEqualValidator);
export const gt = /* @__PURE__ */ lazy(GreaterThenValidator);
export const gte = /* @__PURE__ */ lazy(GreaterThenOrEqualValidator);
export const ne = /* @__PURE__ */ lazy(InequalityValidator);
export const not = /* @__PURE__ */ lazy(NotValidator);
export const or = /* @__PURE__ */ lazy(OrValidator);
export const and = /* @__PURE__ */ lazy(AndValidator);
export const between = /* @__PURE__ */ lazy(RangeValidator);

// known
export const property = /* @__PURE__ */ lazy(PropertyValidator);

// Array
export const fixedArray = /* @__PURE__ */ lazy(FixedArrayValidator);

// Date
export const validDate = /* @__PURE__ */ new ValidDateValidator();

// iterable
export const count = /* @__PURE__ */ lazy(CountValidator);
export const empty = /* @__PURE__ */ new EmptyValidator();
export const item = /* @__PURE__ */ lazy(ItemValidator);
export const maxCount = /* @__PURE__ */ lazy(MaxCountValidator);
export const minCount = /* @__PURE__ */ lazy(MinCountValidator);
export const nonEmpty = /* @__PURE__ */ new NonEmptyValidator();
export const single = /* @__PURE__ */ new SingleValidator();
export const unique = /* @__PURE__ */ new UniqueValidator();

// number
export const int = /* @__PURE__ */ new IntegerValidator();
export const positive = /* @__PURE__ */ new PositiveNumberValidator();

// string
export const pattern = /* @__PURE__ */ lazy(PatternValidator);

function lazy<Args extends readonly unknown[], R>(
  ctor: { new (...args: Args): R },
): (...args: Args) => R {
  return (...args) => new ctor(...args);
}
