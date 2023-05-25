// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Reporter } from "./types.ts";
import { getCount } from "./iter_utils.ts";
import {
  Binder,
  interpolate,
  type ParsePlaceholder,
  shouldBe,
  shouldBeBut,
} from "./utils.ts";
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
import { Error } from "./constants.ts";

type GetContext<T> = T extends Reporter<infer C> ? C : never;

// deno-lint-ignore no-explicit-any
class $<C extends { new (...args: any): Reporter<any> }> extends Binder<C> {
  expect(
    message: (
      ctx: GetContext<InstanceType<C>> & { args: ConstructorParameters<C> } & {
        self: string;
      },
    ) => string,
  ): this {
    this.map(function (args) {
      this.expect((ctx) =>
        message.bind(this)({ ...ctx, args, self: `${this}` })
      );
    });

    return this;
  }

  template<T extends string>(
    template: T,
    fn: (
      ctx: GetContext<InstanceType<C>> & { args: ConstructorParameters<C> } & {
        self: string;
      },
    ) => {
      [k in ParsePlaceholder<T, { prefix: "{"; suffix: "}" }>]: unknown;
    },
  ): this {
    return this.expect((ctx) => interpolate<T>(template, fn(ctx)));
  }
}

export const string = /* @__PURE__ */ new TypeValidator("string");
export const number = /* @__PURE__ */ new TypeValidator("number");
export const bigint = /* @__PURE__ */ new TypeValidator("bigint");
export const boolean = /* @__PURE__ */ new TypeValidator("boolean");
export const instance = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(InstanceValidator).template(
    Error.ShouldBeBut,
    ({ input, self }) => ({ 0: self, 1: input.constructor.name }),
  ).build(),
);
export const type = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(TypeValidator).template(
    Error.ShouldBeBut,
    ({ input, self }) => ({ 0: self, 1: typeof input }),
  ).build(),
);
export const object = /* @__PURE__ */ lazy(DictionaryValidator);
export const optional = /* @__PURE__ */ lazy(OptionalValidator);
export const nullish = /* @__PURE__ */ new NullishValidator();
export const eq = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(EqualityValidator).expect(shouldBeBut).build(),
);
export const lt = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(LessThenValidator).expect(shouldBeBut).build(),
);
export const lte = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(LessThenOrEqualValidator).expect(shouldBeBut).build(),
);
export const gt = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(GreaterThenValidator).expect(shouldBeBut).build(),
);
export const gte = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(GreaterThenOrEqualValidator)
    .expect(shouldBeBut)
    .build(),
);
export const ne = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(InequalityValidator).expect(shouldBeBut).build(),
);
export const not = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(NotValidator).expect(shouldBeBut).build(),
);
export const or = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(OrValidator).expect(shouldBe).build(),
);
export const and = /* @__PURE__ */ lazy(AndValidator);
export const between = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(RangeValidator).expect(shouldBeBut).build(),
);

// known
export const property = /* @__PURE__ */ lazy(PropertyValidator);

// Array
export const fixedArray = /* @__PURE__ */ lazy(FixedArrayValidator);

// Date
export const validDate = /* @__PURE__ */ new ValidDateValidator()
  .expect(shouldBe);

// iterable
export const count = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(CountValidator).template(
    Error.ShouldBeBut,
    ({ input, self }) => ({ 0: self, 1: getCount(input) }),
  ).build(),
);
export const empty = /* @__PURE__ */ new EmptyValidator().expect(shouldBe);
export const item = /* @__PURE__ */ lazy(ItemValidator);
export const maxCount = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(MaxCountValidator).template(
    Error.MaxCount,
    ({ input, args: [size] }) => ({ 0: size, 1: getCount(input) }),
  ).build(),
);
export const minCount = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(MinCountValidator).template(
    Error.MinCount,
    ({ input, args: [size] }) => ({ 0: size, 1: getCount(input) }),
  ).build(),
);
export const nonEmpty = /* @__PURE__ */ new NonEmptyValidator()
  .expect(shouldBe);
export const single = /* @__PURE__ */ new SingleValidator().expect(shouldBe);
export const unique = /* @__PURE__ */ new UniqueValidator().expect(({ item }) =>
  interpolate(Error.Unique, [item])
);

// number
export const int = /* @__PURE__ */ new IntegerValidator().expect(shouldBeBut);
export const positive = /* @__PURE__ */ new PositiveNumberValidator()
  .expect(shouldBeBut);

// string
export const pattern = /* @__PURE__ */ lazy(
  /* @__PURE__ */ new $(PatternValidator).template(
    Error.ShouldBeBut,
    ({ self, input }) => ({ 0: `match ${self}`, 1: `"${input}"` }),
  ).build(),
);

function lazy<Args extends readonly unknown[], R>(
  ctor: { new (...args: Args): R },
): (...args: Args) => R {
  return (...args) => new ctor(...args);
}
