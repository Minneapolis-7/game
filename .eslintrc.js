// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // JavaScript linting
  root: true,
  extends: ['airbnb-base', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
    // https://github.com/prettier/eslint-config-prettier#special-rules
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
    curly: ['error', 'all'],
    'no-tabs': 'error',
    'no-unexpected-multiline': 'error',
  },

  // TypeScript linting
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        project: 'tsconfig.json',
      },
      env: {
        browser: true,
        node: true,
      },
      rules: {
        'class-methods-use-this': 'warn',
        // https://stackoverflow.com/a/64024916/718630
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-this-alias': 'warn',
        'no-underscore-dangle': 0,
        'linebreak-style': 0,

        // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
            tsx: 'never',
          },
        ],

        // https://github.com/prettier/eslint-config-prettier#special-rules
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
        curly: ['error', 'all'],
        'no-tabs': 'error',
        'no-unexpected-multiline': 'error',
      },

      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            paths: ['src'],
          },
        },
      },
    },
  ],
};
