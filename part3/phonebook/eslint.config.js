import js from "@eslint/js";
import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
  js.configs.recommended,
  { languageOptions: { globals: globals.node } },
  { plugins: {
        '@stylistic/js':stylisticJs
  } },
  { rules:{
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error', 'always'
    ],
    'arrow-spacing': [
        'error', { 'before': true, 'after': true }
    ] }
  },
  {
    ignores: ["dist"]
  }
];