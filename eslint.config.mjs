import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    rules: {
      "@next/next/no-img-element": "off", // Allows using <img> instead of <Image />
      "@typescript-eslint/no-explicit-any": "off", // Disables 'any' type errors
      "react-hooks/exhaustive-deps": "warn", // Changes exhaustive deps from error to warning
      "no-console": "warn", // Allows console logs but shows a warning
      "eslint-disable-next-line": "off", // Prevents issues with inline ESLint disables
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
