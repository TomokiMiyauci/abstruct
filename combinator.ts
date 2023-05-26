// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Display } from "./types.ts";
import { getCount } from "./iter_utils.ts";
import { bind, ctorFn, interpolate, shouldBe, shouldBeBut } from "./utils.ts";
import { EnumValidator } from "./validators/enum.ts";
import { KeyValidator } from "./validators/key.ts";
import { ValueValidator } from "./validators/value.ts";
import { RangeValidator } from "./validators/range.ts";
import { FixedArrayValidator } from "./validators/array/fixed_array.ts";
import { DictionaryValidator } from "./validators/object/dictionary.ts";
import { OptionalValidator } from "./validators/object/optional.ts";
import { NullishValidator } from "./validators/nullish.ts";
import { PrototypeValidator } from "./validators/prototype.ts";
import { FloatValidator } from "./validators/number/float.ts";
import { IntegerValidator } from "./validators/number/integer.ts";
import { PositiveNumberValidator } from "./validators/number/positive_number.ts";
import { NegativeNumberValidator } from "./validators/number/negative_number.ts";
import { PatternValidator } from "./validators/string/pattern.ts";
import { CountValidator } from "./validators/iterable/count.ts";
import { EmptyValidator } from "./validators/iterable/empty.ts";
import { ItemValidator } from "./validators/iterable/item.ts";
import { UniqueValidator } from "./validators/iterable/unique.ts";
import { MaxCountValidator } from "./validators/iterable/max_count.ts";
import { MinCountValidator } from "./validators/iterable/min_count.ts";
import { NonEmptyValidator } from "./validators/iterable/non_empty.ts";
import { SingleValidator } from "./validators/iterable/single.ts";
import { EqualityValidator } from "./validators/operators/equality.ts";
import { LessThenValidator } from "./validators/operators/less_than.ts";
import { LessThenOrEqualValidator } from "./validators/operators/less_than_or_equal.ts";
import { GreaterThenValidator } from "./validators/operators/greater_than.ts";
import { GreaterThenOrEqualValidator } from "./validators/operators/greater_than_or_equal.ts";
import { InequalityValidator } from "./validators/operators/inequality.ts";
import { InstanceValidator } from "./validators/operators/instanceof.ts";
import { AndValidator } from "./validators/operators/and.ts";
import { NotValidator } from "./validators/operators/not.ts";
import { OrValidator } from "./validators/operators/or.ts";
import { type Type, TypeValidator } from "./validators/operators/typeof.ts";
import { ValidDateValidator } from "./validators/date/valid_date.ts";
import { Error } from "./constants.ts";
import { NonNegativeNumberValidator } from "./validators/number/non_negative_number.ts";
import { NonPositiveNumberValidator } from "./validators/number/non_positive_number.ts";

export function message(this: Display, { input }: { input: unknown }): string {
  return interpolate(Error.ShouldBeBut, [this, typeof input]);
}

// deno-lint-ignore ban-types
export function message1(this: Display, { input }: { input: {} }): string {
  return interpolate(Error.ShouldBeBut, [this, input.constructor.name]);
}

export function type<T extends Type>(of: T): TypeValidator<T> {
  return new TypeValidator(of).expect(message);
}

export const string = /* @__PURE__ */ type("string");
export const number = /* @__PURE__ */ type("number");
export const bigint = /* @__PURE__ */ type("bigint");
export const boolean = /* @__PURE__ */ type("boolean");
export const symbol = /* @__PURE__ */ type("symbol");
export const enumerate = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(EnumValidator).expect(shouldBeBut).build(),
);
export const instance = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(InstanceValidator).expect(message1).build(),
);
export const prototype = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(PrototypeValidator).expect(shouldBeBut).build(),
);
export const object = /* @__PURE__ */ ctorFn(DictionaryValidator);
export const optional = /* @__PURE__ */ ctorFn(OptionalValidator);
export const nullish = /* @__PURE__ */ new NullishValidator();
export const eq = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(EqualityValidator).expect(shouldBeBut).build(),
);
export const lt = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(LessThenValidator).expect(shouldBeBut).build(),
);
export const lte = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(LessThenOrEqualValidator).expect(shouldBeBut).build(),
);
export const gt = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(GreaterThenValidator).expect(shouldBeBut).build(),
);
export const gte = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(GreaterThenOrEqualValidator).expect(shouldBeBut).build(),
);
export const ne = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(InequalityValidator).expect(shouldBeBut).build(),
);
export const not = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(NotValidator).expect(shouldBeBut).build(),
);
export const or = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(OrValidator).expect(shouldBe).build(),
);
export const and = /* @__PURE__ */ ctorFn(AndValidator);
export const between = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(RangeValidator).expect(shouldBeBut).build(),
);

// known
export const key = /* @__PURE__ */ ctorFn(KeyValidator);
export const value = /* @__PURE__ */ ctorFn(ValueValidator);

// Array
export const fixedArray = /* @__PURE__ */ ctorFn(FixedArrayValidator);

// Date
export const validDate = /* @__PURE__ */ new ValidDateValidator().expect(
  shouldBe,
);

// iterable
export const count = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(CountValidator).expect(({ input }) =>
    interpolate(Error.ShouldBeBut, [this, getCount(input)])
  ).build(),
);
export const empty = /* @__PURE__ */ new EmptyValidator().expect(shouldBe);
export const item = /* @__PURE__ */ ctorFn(ItemValidator);

export function maxCount(limit: number): MaxCountValidator {
  return new MaxCountValidator(limit).expect(({ input }) =>
    interpolate(Error.MaxCount, [limit, getCount(input)])
  );
}

export function minCount(limit: number): MinCountValidator {
  return new MinCountValidator(limit).expect(({ input }) =>
    interpolate(Error.MinCount, [limit, getCount(input)])
  );
}

export const nonEmpty = /* @__PURE__ */ new NonEmptyValidator()
  .expect(shouldBe);
export const single = /* @__PURE__ */ new SingleValidator().expect(shouldBe);
export const unique = /* @__PURE__ */ new UniqueValidator().expect(({ item }) =>
  interpolate(Error.Unique, [item])
);

// number
export const float = /* @__PURE__ */ new FloatValidator().expect(shouldBeBut);
export const int = /* @__PURE__ */ new IntegerValidator().expect(shouldBeBut);
export const int8 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-127, 128),
);
export const int16 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-32768, 32767),
);
export const int32 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-2147483648, 2147483647),
);
export const uint8 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 255),
);
export const uint16 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 65535),
);
export const uint32 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 4294967295),
);
export const negative = /* @__PURE__ */ new NegativeNumberValidator().expect(
  shouldBeBut,
);
export const nonNegative = /* @__PURE__ */ new NonNegativeNumberValidator()
  .expect(shouldBeBut);
export const nonPositive = /* @__PURE__ */ new NonPositiveNumberValidator()
  .expect(shouldBeBut);
export const positive = /* @__PURE__ */ new PositiveNumberValidator()
  .expect(shouldBeBut);

// string
export const pattern = /* @__PURE__ */ ctorFn(
  /* @__PURE__ */ bind(PatternValidator)
    .expect(({ input }) =>
      interpolate(Error.ShouldBeBut, [`match ${this}`, `"${input}"`])
    ).build(),
);
