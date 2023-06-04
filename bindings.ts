// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Constructor, format } from "./deps.ts";
import { type Expectation, type Validator } from "./types.ts";
import { count as getCount } from "./iter_utils.ts";
import {
  createInst,
  Expectable,
  print,
  shouldBe,
  shouldBeBut,
} from "./utils.ts";
import { EnumValidator } from "./validators/enum.ts";
import { RangeValidator } from "./validators/range.ts";
import { FixedArrayValidator } from "./validators/array/fixed_array.ts";
import { PropertiesValidator } from "./validators/object/properties.ts";
import { OptionalValidator } from "./validators/object/optional.ts";
import { PropertyValueValidator } from "./validators/object/property_value.ts";
import { PropertyKeyValidator } from "./validators/object/property_key.ts";
import { NullishValidator } from "./validators/nullish.ts";
import { FloatValidator } from "./validators/number/float.ts";
import { IntegerValidator } from "./validators/number/integer.ts";
import { PositiveNumberValidator } from "./validators/numeric/positive_number.ts";
import { NegativeNumberValidator } from "./validators/numeric/negative_number.ts";
import { NonNegativeNumberValidator } from "./validators/numeric/non_negative_number.ts";
import { NonPositiveNumberValidator } from "./validators/numeric/non_positive_number.ts";
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
import { LessThanValidator } from "./validators/operators/less_than.ts";
import { LessThanOrEqualValidator } from "./validators/operators/less_than_or_equal.ts";
import { GreaterThanValidator } from "./validators/operators/greater_than.ts";
import { GreaterThanOrEqualValidator } from "./validators/operators/greater_than_or_equal.ts";
import { InequalityValidator } from "./validators/operators/inequality.ts";
import { InstanceValidator } from "./validators/operators/instanceof.ts";
import { AndValidator } from "./validators/operators/and.ts";
import { NotValidator } from "./validators/operators/not.ts";
import { OrValidator } from "./validators/operators/or.ts";
import { type TypeStr, TypeValidator } from "./validators/operators/typeof.ts";
import { InValidator } from "./validators/operators/in.ts";
import { ValidDateValidator } from "./validators/date/valid_date.ts";
import { Error } from "./constants.ts";

const $TypeValidator = /* @__PURE__ */ Expectable(TypeValidator);
const $InstanceValidator = /* @__PURE__ */ Expectable(InstanceValidator);
const $AndValidator = /* @__PURE__ */ Expectable(AndValidator);
const $EnumValidator = /* @__PURE__ */ Expectable(EnumValidator);
const $NullishValidator = /* @__PURE__ */ Expectable(NullishValidator);
const $PatternValidator = /* @__PURE__ */ Expectable(PatternValidator);
const $RangeValidator = /* @__PURE__ */ Expectable(RangeValidator);
const $UniqueValidator = /* @__PURE__ */ Expectable(UniqueValidator);
const $EqualityValidator = /* @__PURE__ */ Expectable(EqualityValidator);
const $NegativeNumberValidator = /* @__PURE__ */ Expectable(
  NegativeNumberValidator,
);
const $NonNegativeNumberValidator = /* @__PURE__ */ Expectable(
  NonNegativeNumberValidator,
);
const $NonPositiveNumberValidator = /* @__PURE__ */ Expectable(
  NonPositiveNumberValidator,
);
const $PositiveNumberValidator = /* @__PURE__ */ Expectable(
  PositiveNumberValidator,
);
const $LessThanValidator = /* @__PURE__ */ Expectable(LessThanValidator);
const $LessThanOrEqualValidator = /* @__PURE__ */ Expectable(
  LessThanOrEqualValidator,
);
const $GreaterThanValidator = /* @__PURE__ */ Expectable(GreaterThanValidator);
const $GreaterThanOrEqualValidator = /* @__PURE__ */ Expectable(
  GreaterThanOrEqualValidator,
);
const $InequalityValidator = /* @__PURE__ */ Expectable(InequalityValidator);
const $NotValidator = /* @__PURE__ */ Expectable(NotValidator);
const $OrValidator = /* @__PURE__ */ Expectable(OrValidator);
const $InValidator = /* @__PURE__ */ Expectable(InValidator);
const $ValidDateValidator = /* @__PURE__ */ Expectable(ValidDateValidator);
const $CountValidator = /* @__PURE__ */ Expectable(CountValidator);
const $EmptyValidator = /* @__PURE__ */ Expectable(EmptyValidator);
const $MaxCountValidator = /* @__PURE__ */ Expectable(MaxCountValidator);
const $MinCountValidator = /* @__PURE__ */ Expectable(MinCountValidator);
const $NonEmptyValidator = /* @__PURE__ */ Expectable(NonEmptyValidator);
const $SingleValidator = /* @__PURE__ */ Expectable(SingleValidator);
const $FloatValidator = /* @__PURE__ */ Expectable(FloatValidator);
const $IntegerValidator = /* @__PURE__ */ Expectable(IntegerValidator);

/** Validator factory for JavaScript data type.
 * The difference with `typeof` operator is that `"object"` does not match `null`.
 *
 * @example
 * ```ts
 * import { type } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = type("object")
 * ```
 */
export function type<T extends TypeStr>(of: T) {
  const validator = new $TypeValidator(of);

  return validator.expect(({ input }) =>
    format(Error.ShouldBeBut, [print(validator), typeof input])
  );
}

/** String validator. */
export const string = /* @__PURE__ */ type("string");

/** Number validator. */
export const number = /* @__PURE__ */ type("number");

/** Bigint validator. */
export const bigint = /* @__PURE__ */ type("bigint");

/** Boolean validator. */
export const boolean = /* @__PURE__ */ type("boolean");

/** Symbol validator. */
export const symbol = /* @__PURE__ */ type("symbol");

/** Factory for enumerator validator.
 *
 * @example
 * ```ts
 * import { enumerator } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = enumerator(0, 1, 2, 3);
 * const validator2 = enumerator("Red", "Yellow", "Green");
 * ```
 */
export function enumerator<const T>(
  v1: T,
  v2: T,
  ...values: readonly T[]
) {
  return new $EnumValidator(v1, v2, ...values).expect(shouldBeBut);
}

/** Validator factory equivalent to the `instanceof` operator.
 *
 * @example
 * ```ts
 * import { instance } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = instance(Array);
 * ```
 */
export function instance<T extends Constructor>(of: T) {
  const validator = new $InstanceValidator(of);

  return validator.expect(({ input }) =>
    format(Error.ShouldBeBut, [
      print(validator),
      input?.constructor.name ?? input,
    ])
  );
}

/** Factory for properties validator.
 *
 * @example
 * ```ts
 * import {
 *  number,
 *  props,
 *  string,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * const User = props({ name: string, age: number });
 * ```
 */
export const props = /* @__PURE__ */ createInst(PropertiesValidator);

/** Factory for optional properties validator.
 *
 * @example
 * ```ts
 * import {
 *  number,
 *  optional,
 *  string,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * const Profile = optional({ greeting: string, hobby: string });
 * ```
 */
export const optional = /* @__PURE__ */ createInst(OptionalValidator);

/** Nullish(`null` or `undefined`) validator. */
export const nullish = /* @__PURE__ */ new $NullishValidator().expect(
  shouldBeBut,
);

/** Validator factory equivalent to strict equality(`===`) operator.
 *
 * @example
 * ```ts
 * import { eq } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = eq(0);
 * ```
 */
export function eq<const RIn = unknown>(value: RIn) {
  return new $EqualityValidator(value).expect(shouldBeBut);
}

/** Factory for validator equivalent to less than(`>`) operator.
 *
 * @example
 * ```ts
 * import { lt } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = lt(256);
 * ```
 */
export function lt<In>(base: In) {
  return new $LessThanValidator(base).expect(shouldBeBut);
}

/** Factory for validator equivalent to less than or equal to (`>=`) operator.
 *
 * @example
 * ```ts
 * import { lte } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = lte(255);
 * ```
 */
export function lte<In>(base: In) {
  return new $LessThanOrEqualValidator(base).expect(shouldBeBut);
}

/** Factory for validator equivalent to greater than(`<`) operator.
 *
 * @example
 * ```ts
 * import { gt } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = gt(8);
 * ```
 */
export function gt<In>(base: In) {
  return new $GreaterThanValidator(base).expect(shouldBeBut);
}

/** Factory for validator equivalent to greater than or equal(`<=`) operator.
 *
 * @example
 * ```ts
 * import { gte } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = gte(8);
 * ```
 */
export function gte<In>(base: In) {
  return new $GreaterThanOrEqualValidator(base).expect(shouldBeBut);
}

/** Factory for validator equivalent to strict inequality(`!==`) operator.
 *
 * @example
 * ```ts
 * import { ne } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = ne(0);
 * ```
 */
export function ne(value: unknown) {
  return new $InequalityValidator(value).expect(shouldBeBut);
}

/** Factory for validator inversion.
 *
 * @example
 * ```ts
 * import {
 *   not,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 *
 * declare const validator: Validator;
 * const inversionValidator = not(validator);
 * ```
 */
export function not<In, RIn extends In = In>(
  validator: Readonly<Validator<In, RIn>>,
) {
  new NotValidator(validator);
  return new $NotValidator(validator).expect(shouldBeBut);
}

/** Factory for validator composer like Logical OR.
 *
 * @example
 * ```ts
 * import {
 *   or,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
 * declare const v1: Validator;
 * declare const v2: Validator;
 * declare const v3: Validator;
 *
 * const validator = or(v1, v2, v3);
 * ```
 *
 * If the validators are not type-compatible with each other, generics must be
 * specified.
 *
 * @example
 * ```ts
 * import {
 *   or,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
 * declare const v1: Validator<unknown, string>;
 * declare const v2: Validator<unknown, number>;
 * const validator = or<unknown, string | number>(v1, v2);
 *
 * assertType<Has<typeof validator, Validator<unknown, string | number>>>(true);
 * ```
 *
 * For more information, see
 * [Specifying Type Arguments](https://www.typescriptlang.org/docs/handbook/2/functions.html#specifying-type-arguments).
 */
export function or<In = unknown, RIn extends In = In>(
  v1: Readonly<Validator<In, RIn>>,
  v2: Readonly<Validator<In, RIn>>,
  ...validations: Readonly<Validator<In, RIn>>[]
) {
  new OrValidator(v1, v2);
  return new $OrValidator(v1, v2, ...validations).expect(shouldBe);
}

/** Factory for validator composer like Logical AND.
 * `and` composes multiple validators and creates a new validator. The composed
 * validator executes the validator from left to right, just like the Logical AND
 * operator. If the validation fails en route, the evaluation stops there.
 *
 * @example
 *
 * ```ts
 * import {
 *  and,
 *  between,
 *  gte,
 *  int,
 *  lte,
 * } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const _int8 = and(int, lte(128), gte(-127));
 * const __int8 = and(int, between(-127, 128));
 * ```
 *
 * ## Type-narrowing
 * Composition of `and` is type-safe.
 *
 * Each validator is corrected to satisfy the narrowed type from the previous
 * validators.
 *
 * @example
 *
 * ```ts
 * import {
 *   and,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
 * declare const v1: Validator<unknown, string>;
 * declare const v2: Validator<string, "a" | "b">;
 * declare const v3: Validator<"a" | "b" | "c", "a">;
 * const validator = and(v1, v2, v3);
 *
 * assertType<Has<typeof validator, Validator<unknown, "a">>>(true);
 * ```
 *
 * ## Limit the number of arguments
 * The number of arguments is limited by overloading to achieve this.
 * Currently it accepts up to 5 arguments.
 * This limit is based on the strict `Function.bind` type signature.
 * If more than that is needed, you must nest `and`.
 */
export function and<
  In,
  RIn extends In,
  In2,
  RIn2 extends In2,
>(
  v1: Readonly<Validator<In, RIn>>,
  v2: Readonly<Validator<In2 | RIn, RIn2>>,
): AndValidator<In, RIn & RIn2> & Expectation<{ input: In }>;
export function and<
  In,
  RIn extends In,
  In2,
  RIn2 extends In2,
  In3,
  RIn3 extends In3,
>(
  v1: Readonly<Validator<In, RIn>>,
  v2: Readonly<Validator<In2 | RIn, RIn2>>,
  v3: Readonly<Validator<In3 | RIn & RIn2, RIn3>>,
): AndValidator<In, RIn & RIn2 & RIn3> & Expectation<{ input: In }>;
export function and<
  In,
  RIn extends In,
  In2,
  RIn2 extends In2,
  In3,
  RIn3 extends In3,
  In4,
  RIn4 extends In4,
>(
  v1: Readonly<Validator<In, RIn>>,
  v2: Readonly<Validator<In2 | RIn, RIn2>>,
  v3: Readonly<Validator<In3 | RIn & RIn2, RIn3>>,
  v4: Readonly<Validator<In4 | RIn & RIn2 & RIn3, RIn4>>,
): AndValidator<In, RIn & RIn2 & RIn3 & RIn4> & Expectation<{ input: In }>;
export function and<
  In,
  RIn extends In,
  In2,
  RIn2 extends In2,
  In3,
  RIn3 extends In3,
  In4,
  RIn4 extends In4,
  In5,
  RIn5 extends In5,
>(
  v1: Readonly<Validator<In, RIn>>,
  v2: Readonly<Validator<In2 | RIn, RIn2>>,
  v3: Readonly<Validator<In3 | RIn & RIn2, RIn3>>,
  v4: Readonly<Validator<In4 | RIn & RIn2 & RIn3, RIn4>>,
  v5: Readonly<Validator<In5 | RIn & RIn2 & RIn3 & RIn4, RIn5>>,
):
  & AndValidator<In, RIn & RIn2 & RIn3 & RIn4 & RIn5>
  & Expectation<{ input: In }>;
export function and(
  ...validators: readonly [Readonly<Validator>, Readonly<Validator>]
) {
  return new $AndValidator(validators);
}

/** Factory for existence of property validator.
 *
 * @example
 * ```ts
 * import { has } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = has("prop");
 * ```
 */
export function has<const K extends PropertyKey>(key: K) {
  return new $InValidator(key).expect(() => `should has ${print(key)}`);
}

/** Factory for range validator.
 *
 * @example
 * ```ts
 * import { between } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const numberRangeValidator = between(0, 255);
 * const dateRangeValidator = between(new Date("1970/1/1"), new Date("2038/1/19"));
 * ```
 */
export function between<In>(min: In, max: In) {
  return new $RangeValidator(min, max).expect(shouldBeBut);
}

// Non-nullish

/** Factory for property key validator.
 *
 * @example
 * ```ts
 * import {
 *  propKey,
 *  type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * declare const validator: Validator<string>;
 * const keyValidator = propKey(validator);
 * ```
 */
export const propKey = /* @__PURE__ */ createInst(PropertyKeyValidator);

/** Factory for property value validator.
 *
 * @example
 * ```ts
 * import {
 *   type Validator,
 *   propValue,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * declare const validator: Validator;
 * const valueValidator = propValue(validator);
 * ```
 */
export const propValue = /* @__PURE__ */ createInst(PropertyValueValidator);

// Array
/** Factory for fixed array validator. It checks each item passes each {@link Validator}.
 *
 * @example
 * ```ts
 * import {
 *  fixedArray,
 *  type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * declare const v1: Validator;
 * declare const v2: Validator;
 * const validator = fixedArray(v1, v2);
 * ```
 */
export const fixedArray = /* @__PURE__ */ createInst(FixedArrayValidator);

// Date
/** Valid `Date` validator. */
export const validDate = /* @__PURE__ */ new $ValidDateValidator().expect(
  shouldBe,
);

// iterable

/** Factory for count validator. It checks count(size, length) of items.
 *
 * @example
 * ```ts
 * import { count } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = count(5);
 * ```
 */
export function count(of: number) {
  const validator = new $CountValidator(of);

  return validator.expect(({ input }) =>
    format(Error.ShouldBeBut, [print(validator), getCount(input)])
  );
}

/** Empty validator. It checks the items is empty.
 *
 * @example
 */
export const empty = /* @__PURE__ */ new $EmptyValidator().expect(shouldBe);

/** Factory for item validator.
 * It checks each item of items.
 *
 * @example
 * ```ts
 * import {
 *  item,
 *  type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * declare const validator: Validator;
 * const itemValidator = item(validator);
 * ```
 */
export const item = /* @__PURE__ */ createInst(ItemValidator);

/** Factory for max count validator. It checks items count is less than or equal to {@link limit}.
 *
 * @example
 * ```ts
 * import { maxCount } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * declare const limit: number;
 * const validator = maxCount(limit);
 * ```
 */
export function maxCount(limit: number) {
  return new $MaxCountValidator(limit).expect(({ input }) =>
    format(Error.MaxCount, [limit, getCount(input)])
  );
}

/** Factory for min count validator. It checks items count is greater than or equal to {@link limit}.
 *
 * @example
 * ```ts
 * import { minCount } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * declare const limit: number;
 * const validator = minCount(limit);
 * ```
 */
export function minCount(limit: number) {
  return new $MinCountValidator(limit).expect(({ input }) =>
    format(Error.MinCount, [limit, getCount(input)])
  );
}

/** Non-Empty validator. It checks items is non-empty. */
export const nonEmpty = /* @__PURE__ */ new $NonEmptyValidator()
  .expect(shouldBe);

/** Single validator. It checks items is single. */
export const single = /* @__PURE__ */ new $SingleValidator().expect(shouldBe);

/** Unique validator. It checks the each item is unique. */

export const unique = /* @__PURE__ */ new $UniqueValidator().expect(shouldBe);

// number

/** Float validator. */
export const float = /* @__PURE__ */ new $FloatValidator().expect(shouldBeBut);

/** Integer validator. */
export const int = /* @__PURE__ */ new $IntegerValidator().expect(shouldBeBut);

/** Integer in the range -127 ~ 128 validator. */
export const int8 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-127, 128),
);

/** Integer in the range -32768 ~ 32767 validator. */
export const int16 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-32768, 32767),
);

/** Integer in the range -2147483648 ~ 2147483647 validator. */
export const int32 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(-2147483648, 2147483647),
);

/** Integer in the range 0 ~ 255 validator. */
export const uint8 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 255),
);

/** Integer in the range 0 ~ 65535 validator. */
export const uint16 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 65535),
);

/** Integer in the range 0 ~ 4294967295 validator. */
export const uint32 = /* @__PURE__ */ and(
  int,
  /* @__PURE__ */ between(0, 4294967295),
);

/** Negative number validator. */
export const negative = /* @__PURE__ */ new $NegativeNumberValidator()
  .expect(shouldBeBut);

/** Non-negative number validator. */
export const nonNegative = /* @__PURE__ */ new $NonNegativeNumberValidator()
  .expect(shouldBeBut);

/** Non-positive number validator. */
export const nonPositive = /* @__PURE__ */ new $NonPositiveNumberValidator()
  .expect(shouldBeBut);

/** Positive number validator. */
export const positive = /* @__PURE__ */ new $PositiveNumberValidator()
  .expect(shouldBeBut);

// string

/** Factory for regex pattern validator.
 *
 * @example
 * ```ts
 * import { pattern } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
 * const validator = pattern(/^\d*$/);
 * ```
 */
export function pattern(
  pattern: Readonly<RegExp>,
): PatternValidator & Expectation<{ input: string }> {
  const validator = new $PatternValidator(pattern);

  return validator.expect(({ input }) =>
    format(Error.ShouldBeBut, [`match ${validator}`, print(input)])
  );
}
