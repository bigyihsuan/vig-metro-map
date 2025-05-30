import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
    { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
    { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
    { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
    { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
    stylistic.configs.customize({
        pluginName: "@stylistic",
        indent: 4,
        quotes: "double",
        semi: true,
        jsx: true,
        arrowParens: true,
        braceStyle: "1tbs",
        // blockSpacing: true,
        // quoteProps: "consistent-as-needed",
        commaDangle: "only-multiline",
        severity: "error",
    }),
    tseslint.configs.recommended,
]);
