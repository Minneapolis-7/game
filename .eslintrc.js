// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // Линтинг JavaScript (инфраструктурный код)
  root: true,
  extends: ['airbnb-base', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
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

    'import/order': [
      'error',
      {
        groups: ['external', ['internal', 'parent', 'sibling', 'index'], 'unknown'],
        'newlines-between': 'always',
      },
    ],
  },

  // Линтинг TypeScript (сорсы и сервер)
  overrides: [
    {
      // files: ['**/*.ts', '**/*.tsx'],
      files: ['src/**/*.ts', 'src/**/*.tsx', 'typings/**/*.ts', 'server/**/*.ts'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
      plugins: ['simple-import-sort', '@andreyvolokitin/destructuring'],
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
        'import/order': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // File imports.
              ['^.+\\..+(?<!s?css)$'],
              // Style imports.
              ['^.+\\.s?css$'],
            ],
          },
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',

        // https://github.com/prettier/eslint-config-prettier#special-rules
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
        curly: ['error', 'all'],
        'no-tabs': 'error',
        'no-unexpected-multiline': 'error',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        '@andreyvolokitin/destructuring/in-params': [
          'error',
          { 'max-params': 2, 'max-destructured': 3 },
        ],
      },

      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            paths: ['static'],
          },
          webpack: {
            config: './webpack/webpack.config.js',
          },
        },
      },
    },
  ],
};
