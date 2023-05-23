// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { TypeValidator } from "./validators/type.ts";
import { InstanceValidator } from "./validators/instance.ts";
import { DictionaryValidator } from "./validators/object/dictionary.ts";
import { NullishValidator } from "./validators/nullish.ts";
import { IntegerValidator } from "./validators/number/integer.ts";
import { PositiveNumberValidator } from "./validators/number/positive_number.ts";
import { EqualityValidator } from "./validators/equal.ts";
import { PatternValidator } from "./validators/string/pattern.ts";
import { CountValidator } from "./validators/iterable/count.ts";
import { EmptyValidator } from "./validators/iterable/empty.ts";
import { ItemValidator } from "./validators/iterable/item.ts";
import { MaxCountValidator } from "./validators/iterable/max_count.ts";
import { MinCountValidator } from "./validators/iterable/min_count.ts";
import { NonEmptyValidator } from "./validators/iterable/non_empty.ts";
import { LessValidator } from "./validators/less.ts";
import { GreaterValidator } from "./validators/greater.ts";
import { ValidDateValidator } from "./validators/date/valid_date.ts";
import { AndValidator } from "./operators/and.ts";

export const string = /* @__PURE__ */ new TypeValidator("string");
export const number = /* @__PURE__ */ new TypeValidator("number");
export const bigint = /* @__PURE__ */ new TypeValidator("bigint");
export const boolean = /* @__PURE__ */ new TypeValidator("boolean");
export const instance = /* @__PURE__ */ lazy(InstanceValidator);
export const type = /* @__PURE__ */ lazy(TypeValidator);
export const object = /* @__PURE__ */ lazy(DictionaryValidator);
export const nullish = /* @__PURE__ */ new NullishValidator();
export const eq = /* @__PURE__ */ lazy(EqualityValidator);
export const lt = /* @__PURE__ */ lazy(LessValidator);
export const gt = /* @__PURE__ */ lazy(GreaterValidator);
export const and = /* @__PURE__ */ lazy(AndValidator);

// Date
export const validDate = /* @__PURE__ */ new ValidDateValidator();

// iterable
export const count = /* @__PURE__ */ lazy(CountValidator);
export const empty = /* @__PURE__ */ new EmptyValidator();
export const item = /* @__PURE__ */ lazy(ItemValidator);
export const maxCount = /* @__PURE__ */ lazy(MaxCountValidator);
export const minCount = /* @__PURE__ */ lazy(MinCountValidator);
export const nonEmpty = /* @__PURE__ */ new NonEmptyValidator();

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
