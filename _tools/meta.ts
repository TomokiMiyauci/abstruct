import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "abstruct",
    version,
    description: "Abstract structure for JavaScript data validation",
    keywords: [
      "assert",
      "check",
      "validation",
      "validate",
      "struct",
      "structure",
      "schema",
      "valid",
      "validator",
      "expect",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/abstruct",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/abstruct.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/abstruct/issues",
    },
    sideEffects: false,
    type: "module",
    devDependencies: {
      "@types/node": "latest",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/isx@1.4.0/iterable/is_empty.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "iterable/is_empty.js",
    },
    "https://deno.land/x/isx@1.4.0/iterable/is_not_empty.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "iterable/is_not_empty.js",
    },
    "https://deno.land/x/isx@1.4.0/iterable/is_single.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "iterable/is_single.js",
    },
    "https://deno.land/x/isx@1.4.0/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "is_string.js",
    },
    "https://deno.land/x/isx@1.4.0/is_bigint.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "is_bigint.js",
    },
    "https://deno.land/x/isx@1.4.0/is_nullable.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "is_nullable.js",
    },
    "https://deno.land/x/isx@1.4.0/date/is_valid_date.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "date/is_valid_date.js",
    },
    "https://deno.land/x/isx@1.4.0/numeric/is_positive_number.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "numeric/is_positive_number.js",
    },
    "https://deno.land/x/isx@1.4.0/numeric/is_non_negative_number.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "numeric/is_non_negative_number.js",
    },
    "https://deno.land/x/isx@1.4.0/numeric/is_negative_number.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "numeric/is_negative_number.js",
    },
    "https://deno.land/x/isx@1.4.0/numeric/is_non_positive_number.ts": {
      name: "@miyauci/isx",
      version: "1.4.0",
      subPath: "numeric/is_non_positive_number.js",
    },
    "https://deno.land/x/format@1.0.0/mod.ts": {
      name: "@miyauci/format",
      version: "1.0.0",
    },
    "https://deno.land/x/curry@1.1.0/mod.ts": {
      name: "@miyauci/curry",
      version: "1.1.0",
    },
    "https://deno.land/x/memoization/mod.ts": {
      name: "@miyauci/memo",
      version: "1.0.0",
    },
  },
});
