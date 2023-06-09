# 1.0.0 (2023-06-02)


### Bug Fixes

* **inequality:** remove wrong generics type ([b27518e](https://github.com/TomokiMiyauci/abstruct/commit/b27518e2ac793be37c0d10574ada904b943df504))
* **nullish:** fix to wrong logic ([014737e](https://github.com/TomokiMiyauci/abstruct/commit/014737e4cc4d3a0d613f1a711e0af92d773905c5))
* **utils:** fix to proxy logic ([cbc38ef](https://github.com/TomokiMiyauci/abstruct/commit/cbc38ef9cf9a1767d75b2ff94506df668df72ffd))
* **validators:** change to pass property key as is ([e09287d](https://github.com/TomokiMiyauci/abstruct/commit/e09287d6a0f3c8053f98b577876f6ba933994ae6))


### Features

* add default error message ([d6926b2](https://github.com/TomokiMiyauci/abstruct/commit/d6926b2d7c07f80b5b5e78b4e32f47aadba54d83))
* add readonly signature ([b477323](https://github.com/TomokiMiyauci/abstruct/commit/b47732397dd5e1b15c86035a9b35a2f4d7cfd844))
* **and:** implement reporter interface to logical AND validator ([e3c6e52](https://github.com/TomokiMiyauci/abstruct/commit/e3c6e52b6037ade790f5a98f1c6dffedcde18795))
* **and:** improve represenation ([92fa79f](https://github.com/TomokiMiyauci/abstruct/commit/92fa79fc159f08b9cdd6810695a19cdfe9aec03d))
* **and:** improve type inference of and function ([aaf2a35](https://github.com/TomokiMiyauci/abstruct/commit/aaf2a3595099635ba3f49852e0c562a50e8a63fb))
* **and:** improve type inference of And validator ([85e34b5](https://github.com/TomokiMiyauci/abstruct/commit/85e34b5f4290ef190eb8551a9e37ff24d51def19))
* **bindings:** rename to add prefix of prop ([ec6a956](https://github.com/TomokiMiyauci/abstruct/commit/ec6a956b01b06f56447c53563e0d04418746d411))
* **bindings:** rename to props from object ([feb1f7b](https://github.com/TomokiMiyauci/abstruct/commit/feb1f7bd749e465d67e3ab05f469a295d7fbcdf9))
* change validator interface and change validators ([4734796](https://github.com/TomokiMiyauci/abstruct/commit/4734796dae920eb28e7d5508998cf0fe3c9fc9db))
* **count:** improve display format ([83e9bbf](https://github.com/TomokiMiyauci/abstruct/commit/83e9bbfcac2faae7217652abd5e45a003840ae0c))
* **deps:** replace escape regex module ([95ded0e](https://github.com/TomokiMiyauci/abstruct/commit/95ded0ee807d692176ca957e3ba845cdee2ffe10))
* **deps:** update deps version ([70c12da](https://github.com/TomokiMiyauci/abstruct/commit/70c12dab6581d52b6f6de75bea23fb23a0f6a0cc))
* **deps:** use npm specifier instead of esm.sh ([256a4d3](https://github.com/TomokiMiyauci/abstruct/commit/256a4d3f5fbebada68a4d6f57b5e06c827cb0445))
* **dictionary:** add validator for dictionary ([b231f30](https://github.com/TomokiMiyauci/abstruct/commit/b231f30be05fe0d7302bfde5f741c1f2b09025a1))
* **element:** add validator for element ([bdde405](https://github.com/TomokiMiyauci/abstruct/commit/bdde4056709e8d4301fd919f2b8e2ccc27ad177e))
* **empty:** add validator for empty ([fd4dd0b](https://github.com/TomokiMiyauci/abstruct/commit/fd4dd0bb53336d0eb1162a471933b83050400f78))
* **enum:** add validator for enumerate ([12bde9a](https://github.com/TomokiMiyauci/abstruct/commit/12bde9a2cdc3bf82f801f820792ddda0688cb47c))
* export validator instance ([e9f7adc](https://github.com/TomokiMiyauci/abstruct/commit/e9f7adc7f6e2f650821b9fc43586c760d6c7017d))
* **factories:** rename factory to `enumerator` from `enumerate` ([08eb036](https://github.com/TomokiMiyauci/abstruct/commit/08eb0360a9077cbf5486f0f28329bfc1b47e6ddf))
* **fixed_array:** add validator for fixed array aka tuple ([e7704a7](https://github.com/TomokiMiyauci/abstruct/commit/e7704a70a2c707183495390e1fc7c777e4f6f226))
* **float:** add validator for float ([a66e0ba](https://github.com/TomokiMiyauci/abstruct/commit/a66e0ba909cd1da2aa0dc4d546a45c2f5f67196c))
* **gte:** add validator for greater than or equal operator ([629919b](https://github.com/TomokiMiyauci/abstruct/commit/629919b89941b13ee75b42b0a7956155e19ab6ce))
* **has:** add validator equivalent to in operator ([ef1313e](https://github.com/TomokiMiyauci/abstruct/commit/ef1313e0fa9d206c52989e43d013165c09216a1f))
* **inequality:** add validator for inequality operator ([caee113](https://github.com/TomokiMiyauci/abstruct/commit/caee1133bb89b8a6b576c62a2fc79bee166119a0))
* **instance:** add validator for instance ([9c5309a](https://github.com/TomokiMiyauci/abstruct/commit/9c5309a6e717f3ffac49aeeabeee04c7ff1cff05))
* **instanceof:** improve type infer ([6678943](https://github.com/TomokiMiyauci/abstruct/commit/66789438fd676b29de2beed3f2a920216f205e0f))
* **integer:** add validator for integer ([62ea00a](https://github.com/TomokiMiyauci/abstruct/commit/62ea00a91294ff3df76a72c3f5e8a3ff77694f23))
* **key:** rename property key to key ([dcc3d4d](https://github.com/TomokiMiyauci/abstruct/commit/dcc3d4d228d59f6e8ed43e7b78097137fff6faa4))
* **lte:** add validator for less than or equal operator ([cb247f8](https://github.com/TomokiMiyauci/abstruct/commit/cb247f8aeaaef5e2dc809e8e4825bcd3c074fba2))
* **max_count:** add validator for maximum count of item ([dbbe7ea](https://github.com/TomokiMiyauci/abstruct/commit/dbbe7eaa2f5a3119199e5ff9d53122cd07350fc3))
* **min_count:** add validator for minimum count of item ([9304fac](https://github.com/TomokiMiyauci/abstruct/commit/9304fac83a25b4c0d4e3ee23801445fd2c414ed0))
* **mod:** add validator for signed and unsigned integer ([1c3b569](https://github.com/TomokiMiyauci/abstruct/commit/1c3b569c1b1ee5057a7bf0ab859afe45d2051420))
* **mod:** export all validators ([e3f1106](https://github.com/TomokiMiyauci/abstruct/commit/e3f11068ad87d8039baf990430828d4286b491aa))
* **mod:** export enume validator ([596f790](https://github.com/TomokiMiyauci/abstruct/commit/596f790fb617c30f95f170c0ba0e091553d701d3))
* **mod:** export public modules ([57a5289](https://github.com/TomokiMiyauci/abstruct/commit/57a5289541ac33e7ffbb3b626467009aae3facc2))
* **mod:** export related types ([e61e888](https://github.com/TomokiMiyauci/abstruct/commit/e61e8889f57a66ea39983097eed5dcee7b8cb4b2))
* **mod:** export releated types ([0f23f58](https://github.com/TomokiMiyauci/abstruct/commit/0f23f58978af3fc80b2df601769ebfcd341a36fb))
* **mod:** export typeof validator constructor and related types ([1861650](https://github.com/TomokiMiyauci/abstruct/commit/18616508e8ff93cd8064c3e25be19403973978e4))
* **mod:** export types ([e8eefad](https://github.com/TomokiMiyauci/abstruct/commit/e8eefada9f9cf83646d28c3eb41b185273cd8da8))
* **mod:** export validator for single item ([2c36e86](https://github.com/TomokiMiyauci/abstruct/commit/2c36e861456956baf4e907566f69c807089c1494))
* **mod:** export validator for symbol type ([415ac1a](https://github.com/TomokiMiyauci/abstruct/commit/415ac1ac72719c39928086f73e129539ffdfdf54))
* **mod:** export validator utilities ([5e1e137](https://github.com/TomokiMiyauci/abstruct/commit/5e1e137a23f7a8e7e5d6fe5eda4279cbe0d26341))
* **mod:** omit Reporter impl ([067b328](https://github.com/TomokiMiyauci/abstruct/commit/067b32881accb6e65975b470e3e2f62d65af97a8))
* **mod:** remove prototype validator ([26b5f6c](https://github.com/TomokiMiyauci/abstruct/commit/26b5f6c94366c8ccfbe32c6c5d8398059f3d96e5))
* **negative_number:** add validator for negative number ([3426c99](https://github.com/TomokiMiyauci/abstruct/commit/3426c993da2f91c1061ed7adfd29d91fb3686184))
* **never:** add validator for never ([f44ff99](https://github.com/TomokiMiyauci/abstruct/commit/f44ff99b3be0e782b2a0d8d89ca3ec8f41038465))
* **non_empty:** add validator for non empty ([ac30ed5](https://github.com/TomokiMiyauci/abstruct/commit/ac30ed59f8c8029194ff30f3e32aee55e771b9fb))
* **not:** add validator for logical not operator ([65b97bf](https://github.com/TomokiMiyauci/abstruct/commit/65b97bfe73cf4076bdfe0473a5a589ad454e2ccd))
* **nullish:** add validator for nullish ([47bf837](https://github.com/TomokiMiyauci/abstruct/commit/47bf83763a31cb92fc0abc1fef52f26f44b2592e))
* **numeric:** improve acceptable type to expand bigint ([62b0245](https://github.com/TomokiMiyauci/abstruct/commit/62b0245933db62fa6691a6230f4e5d9c159209c7))
* **object:** add validator for object ([d2978df](https://github.com/TomokiMiyauci/abstruct/commit/d2978df379ab02afb10d1ed595e5f05c8a7e8df2))
* **operators:** add and operator ([9d0b8e3](https://github.com/TomokiMiyauci/abstruct/commit/9d0b8e34855c870d5e5939e8de211bb22e42439b))
* **optional:** add validator for optional object ([9ce9e84](https://github.com/TomokiMiyauci/abstruct/commit/9ce9e84abeb2829b8f883eb319532595e1c16dfe))
* **optional:** change generics constraints ([440f304](https://github.com/TomokiMiyauci/abstruct/commit/440f3048078bd75e3b11d1ed01d31f7221fb2cde))
* **or:** add passing max length of instance path ([f57e4a6](https://github.com/TomokiMiyauci/abstruct/commit/f57e4a68b7058ec773294410641ffae706f80c55))
* **or:** add validator for logical or operator ([63d8d2f](https://github.com/TomokiMiyauci/abstruct/commit/63d8d2f7e891dbf99fd4681628c839d47c99856d))
* **pattern:** add validator for regex pattern ([59b72d3](https://github.com/TomokiMiyauci/abstruct/commit/59b72d3e356ee70737d5cee2b7e2e9cb2c11b5a9))
* **positive_number:** add validator for positive number ([88ab3f5](https://github.com/TomokiMiyauci/abstruct/commit/88ab3f5736e3ad06614ad7232c626aa6a83c825e))
* **positive_number:** expand to accept bigint ([4f6ed2d](https://github.com/TomokiMiyauci/abstruct/commit/4f6ed2d01427ad7cb5c0da97fc51db3ca1c5a620))
* **properties:** change generics constraints ([dbe064f](https://github.com/TomokiMiyauci/abstruct/commit/dbe064f534e48eab8f30fd772bb57b8fa92ecead))
* **properties:** rename to properties validator from object validator ([9ae301d](https://github.com/TomokiMiyauci/abstruct/commit/9ae301d6594460804ae8df0013324c1aae4790d1))
* **property_key:** rename `PropertyValidator` to `PropertyKeyValidator` ([ad06940](https://github.com/TomokiMiyauci/abstruct/commit/ad0694082910c628b8559c9746d447ae201f1101))
* **property_key:** rename validator to property key from key ([db65b8e](https://github.com/TomokiMiyauci/abstruct/commit/db65b8ea017b0725e44817c9968b623fb65838ca))
* **property_value:** rename validator to property value from value ([35b0bec](https://github.com/TomokiMiyauci/abstruct/commit/35b0bec2c6f0a98580ad40a8a805684b52c9f2d7))
* **property:** add validator for property ([9e46ffd](https://github.com/TomokiMiyauci/abstruct/commit/9e46ffd9ab30e8d616d93bea87a5f7d0e181b6ee))
* **prototype:** add validator for prototype ([e031ab5](https://github.com/TomokiMiyauci/abstruct/commit/e031ab5467a3aaf37f74531445fbfe41125bd9fe))
* **range:** add validator for range ([77e3004](https://github.com/TomokiMiyauci/abstruct/commit/77e3004a1f6126f0c757cbbd7c7a6953fb82a2c3))
* **range:** change throwing error condition ([7132e94](https://github.com/TomokiMiyauci/abstruct/commit/7132e94eeb73f95421c98f3780913efe7b866e7f))
* **single:** add validator for single item ([2bde8c0](https://github.com/TomokiMiyauci/abstruct/commit/2bde8c06cebeac414bbedeeed3cb8545220dc415))
* **size:** add validator for element size ([dccc945](https://github.com/TomokiMiyauci/abstruct/commit/dccc945ffbdcc2df5398b4844f1709b25902c006))
* **trim:** add transformer for trim ([474bf66](https://github.com/TomokiMiyauci/abstruct/commit/474bf6672a5589e67f57c51631cfacb6794dcdcc))
* **type:** add type of null and check "object" type is null or not ([77020b4](https://github.com/TomokiMiyauci/abstruct/commit/77020b46fa282e7143dd94e7d2a2d4212d6f1e29))
* **type:** add validator for value type ([262f1d5](https://github.com/TomokiMiyauci/abstruct/commit/262f1d59f20cab4eea0b7294b739352d7b874077))
* **typeof:** improve representation ([a81bd14](https://github.com/TomokiMiyauci/abstruct/commit/a81bd144f0ddbcbf641ce912cb009b17425384d6))
* **types:** add optional type variance ([7d71b8c](https://github.com/TomokiMiyauci/abstruct/commit/7d71b8cfe2b684c11763eb3c936fa7ae10fd4876))
* **types:** add public interface ([17e4453](https://github.com/TomokiMiyauci/abstruct/commit/17e44538356985db8421fb522f5802ca093d82cf))
* **types:** add reporter interface ([42a1238](https://github.com/TomokiMiyauci/abstruct/commit/42a12387eed994240e4cd6242b8ad7d992e0c49f))
* **types:** add validation context interface ([c95f89e](https://github.com/TomokiMiyauci/abstruct/commit/c95f89eff81f4cefd722233ba398cf298bbcd95d))
* **types:** expand instancePath types ([b855eeb](https://github.com/TomokiMiyauci/abstruct/commit/b855eebc8a352b2aa699b9633be1c12a159f0abc))
* **types:** remove struct constructor ([bd40790](https://github.com/TomokiMiyauci/abstruct/commit/bd407901ded879352fb5a6b63f97ac13df11de60))
* **types:** remove unused types ([64a56bf](https://github.com/TomokiMiyauci/abstruct/commit/64a56bf9ccbd8bed5b04d3e3ae7e47a8d538cafe))
* **types:** rename interface of `ValidationError` ([a121e4f](https://github.com/TomokiMiyauci/abstruct/commit/a121e4fc750d7b158cba0aa0148830cff09a0f83))
* **types:** rename to `Expectation` ([747dbf6](https://github.com/TomokiMiyauci/abstruct/commit/747dbf6ccd89d78bc136eeafc4742199b12d0440))
* **unique:** add validator for unique item ([0d34889](https://github.com/TomokiMiyauci/abstruct/commit/0d348892d8eaa8b9bf923fdff06dbe22578455ce))
* **unknown:** add validator for any value ([c870c00](https://github.com/TomokiMiyauci/abstruct/commit/c870c00173af6ec4c36850bce20badfc27ae926f))
* **utils:** add helper for validator definition ([2c907d4](https://github.com/TomokiMiyauci/abstruct/commit/2c907d4a0fd507da6015d6a7da61d95edfa69dae))
* **utils:** add lazy function that create validator lazily ([a44d149](https://github.com/TomokiMiyauci/abstruct/commit/a44d1493f421bfa262b0501fa33d6c43db1c3485))
* **utils:** add utility for define validator ([dd966ce](https://github.com/TomokiMiyauci/abstruct/commit/dd966ce741e331ede64ad2dd16823e60d6bbe8d6))
* **utils:** impl toString method ([9069e2a](https://github.com/TomokiMiyauci/abstruct/commit/9069e2a437917115c4294c08a96e1ba94e9922c8))
* **utils:** improve print data format ([6e3470d](https://github.com/TomokiMiyauci/abstruct/commit/6e3470dc5cd3cf8aa2208f2e991872647d3e06fa))
* **validation:** add flag for path information ([430fd90](https://github.com/TomokiMiyauci/abstruct/commit/430fd9015116c2798e92957e65f8dc348e82e51a))
* **validation:** add root name option for path info ([1fbd4d2](https://github.com/TomokiMiyauci/abstruct/commit/1fbd4d264350a3e33d64e988b93ad3cb51263016))
* **validation:** add validation functions ([294b5c6](https://github.com/TomokiMiyauci/abstruct/commit/294b5c685b12209ee4722389c5a5685b4be808e4))
* **validation:** change assert options interface ([5c15def](https://github.com/TomokiMiyauci/abstruct/commit/5c15defcf276dab3c6dc3a625aaa4f35a9de69ef))
* **validation:** change default assert strategy ([09b8aae](https://github.com/TomokiMiyauci/abstruct/commit/09b8aae6e877fa35875ab76dc42148e6847f1d68))
* **validation:** improve return type to tuple ([a10094e](https://github.com/TomokiMiyauci/abstruct/commit/a10094e8c75ddbe97cbf271c08e4c58201a85251))
* **validation:** improve to accept a wider range of types ([0c004f5](https://github.com/TomokiMiyauci/abstruct/commit/0c004f5013b12f32193f0797a87cef23f19cf6f0))
* **validation:** remove `captureStackTrace` field ([3114bb5](https://github.com/TomokiMiyauci/abstruct/commit/3114bb5929a6efe37546d4782c5af1400efc3f11))
* **validation:** rename field to `maxFailures` ([228bdf4](https://github.com/TomokiMiyauci/abstruct/commit/228bdf40336f4e160cb32c1b80d80bd16130ad83))
* **validation:** rename interface for assert ([b37a448](https://github.com/TomokiMiyauci/abstruct/commit/b37a4489c8c6708f2b6a70d2be2875d186fac5fa))
* **validation:** rename interface name ([dca6895](https://github.com/TomokiMiyauci/abstruct/commit/dca689521e1c2285ee57ff1d20ce3b2c63002e94))
* **validators:** add validator for comparision ([548e6ee](https://github.com/TomokiMiyauci/abstruct/commit/548e6ee7dca34ff2963b89cb6718d8bce398f472))
* **validators:** add validator for non-negative number and non-positive number ([597a8ca](https://github.com/TomokiMiyauci/abstruct/commit/597a8caefc691e008f0257e39278d00184c24c1a))
* **validators:** add validator for valid Date object ([e347ae9](https://github.com/TomokiMiyauci/abstruct/commit/e347ae91089985233624329aaef7bc896347c7d9))
* **value:** add validator for property value ([cd994e3](https://github.com/TomokiMiyauci/abstruct/commit/cd994e3fae6b402d6cbd8980eeba21ea7ee162b8))
* **value:** add validator for value ([d64083f](https://github.com/TomokiMiyauci/abstruct/commit/d64083f32d5b63f1b6221b8db58456db30a73643))


### Performance Improvements

* **constants:** remove top-level exported const enum ([c971484](https://github.com/TomokiMiyauci/abstruct/commit/c97148416a74565c84002be1e794c3dcf4915f87))
* **validators:** remove all decorator ([9cf902a](https://github.com/TomokiMiyauci/abstruct/commit/9cf902ac987b3b27318557d48c387d8a0e881d77))

# [1.0.0-beta.12](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.11...1.0.0-beta.12) (2023-06-02)


### Features

* **validation:** add flag for path information ([430fd90](https://github.com/TomokiMiyauci/abstruct/commit/430fd9015116c2798e92957e65f8dc348e82e51a))
* **validation:** add root name option for path info ([1fbd4d2](https://github.com/TomokiMiyauci/abstruct/commit/1fbd4d264350a3e33d64e988b93ad3cb51263016))

# [1.0.0-beta.11](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.10...1.0.0-beta.11) (2023-06-02)


### Features

* **bindings:** rename to props from object ([feb1f7b](https://github.com/TomokiMiyauci/abstruct/commit/feb1f7bd749e465d67e3ab05f469a295d7fbcdf9))
* **optional:** change generics constraints ([440f304](https://github.com/TomokiMiyauci/abstruct/commit/440f3048078bd75e3b11d1ed01d31f7221fb2cde))
* **properties:** change generics constraints ([dbe064f](https://github.com/TomokiMiyauci/abstruct/commit/dbe064f534e48eab8f30fd772bb57b8fa92ecead))
* **types:** remove struct constructor ([bd40790](https://github.com/TomokiMiyauci/abstruct/commit/bd407901ded879352fb5a6b63f97ac13df11de60))

# [1.0.0-beta.10](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.9...1.0.0-beta.10) (2023-06-02)


### Features

* **bindings:** rename to add prefix of prop ([ec6a956](https://github.com/TomokiMiyauci/abstruct/commit/ec6a956b01b06f56447c53563e0d04418746d411))
* **deps:** replace escape regex module ([95ded0e](https://github.com/TomokiMiyauci/abstruct/commit/95ded0ee807d692176ca957e3ba845cdee2ffe10))
* **mod:** export all validators ([e3f1106](https://github.com/TomokiMiyauci/abstruct/commit/e3f11068ad87d8039baf990430828d4286b491aa))
* **properties:** rename to properties validator from object validator ([9ae301d](https://github.com/TomokiMiyauci/abstruct/commit/9ae301d6594460804ae8df0013324c1aae4790d1))
* **property_key:** rename validator to property key from key ([db65b8e](https://github.com/TomokiMiyauci/abstruct/commit/db65b8ea017b0725e44817c9968b623fb65838ca))
* **property_value:** rename validator to property value from value ([35b0bec](https://github.com/TomokiMiyauci/abstruct/commit/35b0bec2c6f0a98580ad40a8a805684b52c9f2d7))

# [1.0.0-beta.9](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.8...1.0.0-beta.9) (2023-06-01)


### Features

* add readonly signature ([b477323](https://github.com/TomokiMiyauci/abstruct/commit/b47732397dd5e1b15c86035a9b35a2f4d7cfd844))
* **deps:** use npm specifier instead of esm.sh ([256a4d3](https://github.com/TomokiMiyauci/abstruct/commit/256a4d3f5fbebada68a4d6f57b5e06c827cb0445))
* **types:** remove unused types ([64a56bf](https://github.com/TomokiMiyauci/abstruct/commit/64a56bf9ccbd8bed5b04d3e3ae7e47a8d538cafe))
* **types:** rename to `Expectation` ([747dbf6](https://github.com/TomokiMiyauci/abstruct/commit/747dbf6ccd89d78bc136eeafc4742199b12d0440))

# [1.0.0-beta.8](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.7...1.0.0-beta.8) (2023-06-01)


### Features

* **deps:** update deps version ([70c12da](https://github.com/TomokiMiyauci/abstruct/commit/70c12dab6581d52b6f6de75bea23fb23a0f6a0cc))
* **mod:** export validator utilities ([5e1e137](https://github.com/TomokiMiyauci/abstruct/commit/5e1e137a23f7a8e7e5d6fe5eda4279cbe0d26341))
* **mod:** omit Reporter impl ([067b328](https://github.com/TomokiMiyauci/abstruct/commit/067b32881accb6e65975b470e3e2f62d65af97a8))
* **utils:** add helper for validator definition ([2c907d4](https://github.com/TomokiMiyauci/abstruct/commit/2c907d4a0fd507da6015d6a7da61d95edfa69dae))
* **utils:** add utility for define validator ([dd966ce](https://github.com/TomokiMiyauci/abstruct/commit/dd966ce741e331ede64ad2dd16823e60d6bbe8d6))

# [1.0.0-beta.7](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.6...1.0.0-beta.7) (2023-05-31)


### Bug Fixes

* **validators:** change to pass property key as is ([e09287d](https://github.com/TomokiMiyauci/abstruct/commit/e09287d6a0f3c8053f98b577876f6ba933994ae6))


### Features

* **range:** change throwing error condition ([7132e94](https://github.com/TomokiMiyauci/abstruct/commit/7132e94eeb73f95421c98f3780913efe7b866e7f))
* **types:** expand instancePath types ([b855eeb](https://github.com/TomokiMiyauci/abstruct/commit/b855eebc8a352b2aa699b9633be1c12a159f0abc))
* **validation:** change default assert strategy ([09b8aae](https://github.com/TomokiMiyauci/abstruct/commit/09b8aae6e877fa35875ab76dc42148e6847f1d68))
* **validation:** rename field to `maxFailures` ([228bdf4](https://github.com/TomokiMiyauci/abstruct/commit/228bdf40336f4e160cb32c1b80d80bd16130ad83))
* **validation:** rename interface for assert ([b37a448](https://github.com/TomokiMiyauci/abstruct/commit/b37a4489c8c6708f2b6a70d2be2875d186fac5fa))

# [1.0.0-beta.6](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.5...1.0.0-beta.6) (2023-05-29)


### Features

* **factories:** rename factory to `enumerator` from `enumerate` ([08eb036](https://github.com/TomokiMiyauci/abstruct/commit/08eb0360a9077cbf5486f0f28329bfc1b47e6ddf))
* **has:** add validator equivalent to in operator ([ef1313e](https://github.com/TomokiMiyauci/abstruct/commit/ef1313e0fa9d206c52989e43d013165c09216a1f))
* **mod:** remove prototype validator ([26b5f6c](https://github.com/TomokiMiyauci/abstruct/commit/26b5f6c94366c8ccfbe32c6c5d8398059f3d96e5))

# [1.0.0-beta.5](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.4...1.0.0-beta.5) (2023-05-28)


### Bug Fixes

* **inequality:** remove wrong generics type ([b27518e](https://github.com/TomokiMiyauci/abstruct/commit/b27518e2ac793be37c0d10574ada904b943df504))


### Features

* **mod:** export releated types ([0f23f58](https://github.com/TomokiMiyauci/abstruct/commit/0f23f58978af3fc80b2df601769ebfcd341a36fb))
* **mod:** export typeof validator constructor and related types ([1861650](https://github.com/TomokiMiyauci/abstruct/commit/18616508e8ff93cd8064c3e25be19403973978e4))
* **numeric:** improve acceptable type to expand bigint ([62b0245](https://github.com/TomokiMiyauci/abstruct/commit/62b0245933db62fa6691a6230f4e5d9c159209c7))
* **positive_number:** expand to accept bigint ([4f6ed2d](https://github.com/TomokiMiyauci/abstruct/commit/4f6ed2d01427ad7cb5c0da97fc51db3ca1c5a620))
* **utils:** improve print data format ([6e3470d](https://github.com/TomokiMiyauci/abstruct/commit/6e3470dc5cd3cf8aa2208f2e991872647d3e06fa))
* **validation:** change assert options interface ([5c15def](https://github.com/TomokiMiyauci/abstruct/commit/5c15defcf276dab3c6dc3a625aaa4f35a9de69ef))

# [1.0.0-beta.4](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.3...1.0.0-beta.4) (2023-05-27)


### Features

* **and:** improve type inference of and function ([aaf2a35](https://github.com/TomokiMiyauci/abstruct/commit/aaf2a3595099635ba3f49852e0c562a50e8a63fb))
* **and:** improve type inference of And validator ([85e34b5](https://github.com/TomokiMiyauci/abstruct/commit/85e34b5f4290ef190eb8551a9e37ff24d51def19))
* **float:** add validator for float ([a66e0ba](https://github.com/TomokiMiyauci/abstruct/commit/a66e0ba909cd1da2aa0dc4d546a45c2f5f67196c))
* **validation:** improve return type to tuple ([a10094e](https://github.com/TomokiMiyauci/abstruct/commit/a10094e8c75ddbe97cbf271c08e4c58201a85251))
* **validation:** improve to accept a wider range of types ([0c004f5](https://github.com/TomokiMiyauci/abstruct/commit/0c004f5013b12f32193f0797a87cef23f19cf6f0))
* **validation:** remove `captureStackTrace` field ([3114bb5](https://github.com/TomokiMiyauci/abstruct/commit/3114bb5929a6efe37546d4782c5af1400efc3f11))
* **validation:** rename interface name ([dca6895](https://github.com/TomokiMiyauci/abstruct/commit/dca689521e1c2285ee57ff1d20ce3b2c63002e94))

# [1.0.0-beta.3](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.2...1.0.0-beta.3) (2023-05-26)


### Bug Fixes

* **nullish:** fix to wrong logic ([014737e](https://github.com/TomokiMiyauci/abstruct/commit/014737e4cc4d3a0d613f1a711e0af92d773905c5))
* **utils:** fix to proxy logic ([cbc38ef](https://github.com/TomokiMiyauci/abstruct/commit/cbc38ef9cf9a1767d75b2ff94506df668df72ffd))


### Features

* add default error message ([d6926b2](https://github.com/TomokiMiyauci/abstruct/commit/d6926b2d7c07f80b5b5e78b4e32f47aadba54d83))
* **and:** implement reporter interface to logical AND validator ([e3c6e52](https://github.com/TomokiMiyauci/abstruct/commit/e3c6e52b6037ade790f5a98f1c6dffedcde18795))
* **and:** improve represenation ([92fa79f](https://github.com/TomokiMiyauci/abstruct/commit/92fa79fc159f08b9cdd6810695a19cdfe9aec03d))
* **instanceof:** improve type infer ([6678943](https://github.com/TomokiMiyauci/abstruct/commit/66789438fd676b29de2beed3f2a920216f205e0f))
* **key:** rename property key to key ([dcc3d4d](https://github.com/TomokiMiyauci/abstruct/commit/dcc3d4d228d59f6e8ed43e7b78097137fff6faa4))
* **mod:** add validator for signed and unsigned integer ([1c3b569](https://github.com/TomokiMiyauci/abstruct/commit/1c3b569c1b1ee5057a7bf0ab859afe45d2051420))
* **mod:** export enume validator ([596f790](https://github.com/TomokiMiyauci/abstruct/commit/596f790fb617c30f95f170c0ba0e091553d701d3))
* **mod:** export types ([e8eefad](https://github.com/TomokiMiyauci/abstruct/commit/e8eefada9f9cf83646d28c3eb41b185273cd8da8))
* **mod:** export validator for single item ([2c36e86](https://github.com/TomokiMiyauci/abstruct/commit/2c36e861456956baf4e907566f69c807089c1494))
* **mod:** export validator for symbol type ([415ac1a](https://github.com/TomokiMiyauci/abstruct/commit/415ac1ac72719c39928086f73e129539ffdfdf54))
* **negative_number:** add validator for negative number ([3426c99](https://github.com/TomokiMiyauci/abstruct/commit/3426c993da2f91c1061ed7adfd29d91fb3686184))
* **or:** add passing max length of instance path ([f57e4a6](https://github.com/TomokiMiyauci/abstruct/commit/f57e4a68b7058ec773294410641ffae706f80c55))
* **property_key:** rename `PropertyValidator` to `PropertyKeyValidator` ([ad06940](https://github.com/TomokiMiyauci/abstruct/commit/ad0694082910c628b8559c9746d447ae201f1101))
* **prototype:** add validator for prototype ([e031ab5](https://github.com/TomokiMiyauci/abstruct/commit/e031ab5467a3aaf37f74531445fbfe41125bd9fe))
* **range:** add validator for range ([77e3004](https://github.com/TomokiMiyauci/abstruct/commit/77e3004a1f6126f0c757cbbd7c7a6953fb82a2c3))
* **single:** add validator for single item ([2bde8c0](https://github.com/TomokiMiyauci/abstruct/commit/2bde8c06cebeac414bbedeeed3cb8545220dc415))
* **typeof:** improve representation ([a81bd14](https://github.com/TomokiMiyauci/abstruct/commit/a81bd144f0ddbcbf641ce912cb009b17425384d6))
* **types:** add validation context interface ([c95f89e](https://github.com/TomokiMiyauci/abstruct/commit/c95f89eff81f4cefd722233ba398cf298bbcd95d))
* **utils:** add lazy function that create validator lazily ([a44d149](https://github.com/TomokiMiyauci/abstruct/commit/a44d1493f421bfa262b0501fa33d6c43db1c3485))
* **utils:** impl toString method ([9069e2a](https://github.com/TomokiMiyauci/abstruct/commit/9069e2a437917115c4294c08a96e1ba94e9922c8))
* **validators:** add validator for non-negative number and non-positive number ([597a8ca](https://github.com/TomokiMiyauci/abstruct/commit/597a8caefc691e008f0257e39278d00184c24c1a))
* **value:** add validator for property value ([cd994e3](https://github.com/TomokiMiyauci/abstruct/commit/cd994e3fae6b402d6cbd8980eeba21ea7ee162b8))


### Performance Improvements

* **constants:** remove top-level exported const enum ([c971484](https://github.com/TomokiMiyauci/abstruct/commit/c97148416a74565c84002be1e794c3dcf4915f87))
* **validators:** remove all decorator ([9cf902a](https://github.com/TomokiMiyauci/abstruct/commit/9cf902ac987b3b27318557d48c387d8a0e881d77))

# [1.0.0-beta.2](https://github.com/TomokiMiyauci/abstruct/compare/1.0.0-beta.1...1.0.0-beta.2) (2023-05-24)


### Features

* change validator interface and change validators ([4734796](https://github.com/TomokiMiyauci/abstruct/commit/4734796dae920eb28e7d5508998cf0fe3c9fc9db))
* **fixed_array:** add validator for fixed array aka tuple ([e7704a7](https://github.com/TomokiMiyauci/abstruct/commit/e7704a70a2c707183495390e1fc7c777e4f6f226))
* **gte:** add validator for greater than or equal operator ([629919b](https://github.com/TomokiMiyauci/abstruct/commit/629919b89941b13ee75b42b0a7956155e19ab6ce))
* **inequality:** add validator for inequality operator ([caee113](https://github.com/TomokiMiyauci/abstruct/commit/caee1133bb89b8a6b576c62a2fc79bee166119a0))
* **lte:** add validator for less than or equal operator ([cb247f8](https://github.com/TomokiMiyauci/abstruct/commit/cb247f8aeaaef5e2dc809e8e4825bcd3c074fba2))
* **mod:** export related types ([e61e888](https://github.com/TomokiMiyauci/abstruct/commit/e61e8889f57a66ea39983097eed5dcee7b8cb4b2))
* **not:** add validator for logical not operator ([65b97bf](https://github.com/TomokiMiyauci/abstruct/commit/65b97bfe73cf4076bdfe0473a5a589ad454e2ccd))
* **optional:** add validator for optional object ([9ce9e84](https://github.com/TomokiMiyauci/abstruct/commit/9ce9e84abeb2829b8f883eb319532595e1c16dfe))
* **or:** add validator for logical or operator ([63d8d2f](https://github.com/TomokiMiyauci/abstruct/commit/63d8d2f7e891dbf99fd4681628c839d47c99856d))
* **property:** add validator for property ([9e46ffd](https://github.com/TomokiMiyauci/abstruct/commit/9e46ffd9ab30e8d616d93bea87a5f7d0e181b6ee))
* **types:** rename interface of `ValidationError` ([a121e4f](https://github.com/TomokiMiyauci/abstruct/commit/a121e4fc750d7b158cba0aa0148830cff09a0f83))
* **unique:** add validator for unique item ([0d34889](https://github.com/TomokiMiyauci/abstruct/commit/0d348892d8eaa8b9bf923fdff06dbe22578455ce))

# 1.0.0-beta.1 (2023-05-23)


### Features

* **count:** improve display format ([83e9bbf](https://github.com/TomokiMiyauci/abstruct/commit/83e9bbfcac2faae7217652abd5e45a003840ae0c))
* **dictionary:** add validator for dictionary ([b231f30](https://github.com/TomokiMiyauci/abstruct/commit/b231f30be05fe0d7302bfde5f741c1f2b09025a1))
* **element:** add validator for element ([bdde405](https://github.com/TomokiMiyauci/abstruct/commit/bdde4056709e8d4301fd919f2b8e2ccc27ad177e))
* **empty:** add validator for empty ([fd4dd0b](https://github.com/TomokiMiyauci/abstruct/commit/fd4dd0bb53336d0eb1162a471933b83050400f78))
* **enum:** add validator for enumerate ([12bde9a](https://github.com/TomokiMiyauci/abstruct/commit/12bde9a2cdc3bf82f801f820792ddda0688cb47c))
* export validator instance ([e9f7adc](https://github.com/TomokiMiyauci/abstruct/commit/e9f7adc7f6e2f650821b9fc43586c760d6c7017d))
* **instance:** add validator for instance ([9c5309a](https://github.com/TomokiMiyauci/abstruct/commit/9c5309a6e717f3ffac49aeeabeee04c7ff1cff05))
* **integer:** add validator for integer ([62ea00a](https://github.com/TomokiMiyauci/abstruct/commit/62ea00a91294ff3df76a72c3f5e8a3ff77694f23))
* **max_count:** add validator for maximum count of item ([dbbe7ea](https://github.com/TomokiMiyauci/abstruct/commit/dbbe7eaa2f5a3119199e5ff9d53122cd07350fc3))
* **min_count:** add validator for minimum count of item ([9304fac](https://github.com/TomokiMiyauci/abstruct/commit/9304fac83a25b4c0d4e3ee23801445fd2c414ed0))
* **mod:** export public modules ([57a5289](https://github.com/TomokiMiyauci/abstruct/commit/57a5289541ac33e7ffbb3b626467009aae3facc2))
* **never:** add validator for never ([f44ff99](https://github.com/TomokiMiyauci/abstruct/commit/f44ff99b3be0e782b2a0d8d89ca3ec8f41038465))
* **non_empty:** add validator for non empty ([ac30ed5](https://github.com/TomokiMiyauci/abstruct/commit/ac30ed59f8c8029194ff30f3e32aee55e771b9fb))
* **nullish:** add validator for nullish ([47bf837](https://github.com/TomokiMiyauci/abstruct/commit/47bf83763a31cb92fc0abc1fef52f26f44b2592e))
* **object:** add validator for object ([d2978df](https://github.com/TomokiMiyauci/abstruct/commit/d2978df379ab02afb10d1ed595e5f05c8a7e8df2))
* **operators:** add and operator ([9d0b8e3](https://github.com/TomokiMiyauci/abstruct/commit/9d0b8e34855c870d5e5939e8de211bb22e42439b))
* **pattern:** add validator for regex pattern ([59b72d3](https://github.com/TomokiMiyauci/abstruct/commit/59b72d3e356ee70737d5cee2b7e2e9cb2c11b5a9))
* **positive_number:** add validator for positive number ([88ab3f5](https://github.com/TomokiMiyauci/abstruct/commit/88ab3f5736e3ad06614ad7232c626aa6a83c825e))
* **size:** add validator for element size ([dccc945](https://github.com/TomokiMiyauci/abstruct/commit/dccc945ffbdcc2df5398b4844f1709b25902c006))
* **trim:** add transformer for trim ([474bf66](https://github.com/TomokiMiyauci/abstruct/commit/474bf6672a5589e67f57c51631cfacb6794dcdcc))
* **type:** add type of null and check "object" type is null or not ([77020b4](https://github.com/TomokiMiyauci/abstruct/commit/77020b46fa282e7143dd94e7d2a2d4212d6f1e29))
* **type:** add validator for value type ([262f1d5](https://github.com/TomokiMiyauci/abstruct/commit/262f1d59f20cab4eea0b7294b739352d7b874077))
* **types:** add optional type variance ([7d71b8c](https://github.com/TomokiMiyauci/abstruct/commit/7d71b8cfe2b684c11763eb3c936fa7ae10fd4876))
* **types:** add public interface ([17e4453](https://github.com/TomokiMiyauci/abstruct/commit/17e44538356985db8421fb522f5802ca093d82cf))
* **types:** add reporter interface ([42a1238](https://github.com/TomokiMiyauci/abstruct/commit/42a12387eed994240e4cd6242b8ad7d992e0c49f))
* **unknown:** add validator for any value ([c870c00](https://github.com/TomokiMiyauci/abstruct/commit/c870c00173af6ec4c36850bce20badfc27ae926f))
* **validation:** add validation functions ([294b5c6](https://github.com/TomokiMiyauci/abstruct/commit/294b5c685b12209ee4722389c5a5685b4be808e4))
* **validators:** add validator for comparision ([548e6ee](https://github.com/TomokiMiyauci/abstruct/commit/548e6ee7dca34ff2963b89cb6718d8bce398f472))
* **validators:** add validator for valid Date object ([e347ae9](https://github.com/TomokiMiyauci/abstruct/commit/e347ae91089985233624329aaef7bc896347c7d9))
* **value:** add validator for value ([d64083f](https://github.com/TomokiMiyauci/abstruct/commit/d64083f32d5b63f1b6221b8db58456db30a73643))
