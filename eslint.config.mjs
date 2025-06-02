import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
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
        commaDangle: "always-multiline",
        severity: "error",
    }),
    tseslint.configs.recommended,
]);
