import { withNuxt } from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintIgnores from './eslint.ignores.js';
import pluginSecurity from 'eslint-plugin-security';
import tseslint from 'typescript-eslint';

export default withNuxt({
  files: ['**/*.js', '**/*.vue'],
  rules: {
    'prettier/prettier': 'error',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ]
  }
}).prepend(
  eslintIgnores,
  tseslint.configs.recommended,
  pluginSecurity.configs.recommended,
  eslintPluginPrettierRecommended
);
