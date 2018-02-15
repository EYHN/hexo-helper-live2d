module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  // 'extends': 'eslint:all',
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error',
        2
      ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-console': 'off',
    'no-extra-parens': [
      'error',
    ],
    'valid-jsdoc': [
      'warn',
    ],
    'array-callback-return': [
      'error',
    ],
    'block-scoped-var': [
      'warn',
    ],
    'consistent-return': [
      'error',
      {
        'treatUndefinedAsUnspecified': true,
      }
    ],
    'curly': [
      'warn',
      'all',
    ],
    'default-case': [
      'error',
    ],
    'dot-location': [
      'error',
      'property',
    ],
    'dot-notation': [
      'warn',
    ],
    'eqeqeq': [
      'error',
    ],
    'no-else-return': [
      'error',
    ],
    'no-empty-function': [
      'error',
    ],
    'no-magic-numbers': [
      'warn',
      {
        'ignore': [0],
      },
    ],
    'no-multi-spaces': [
      'warn',
    ],
    'no-return-assign': [
      'error',
    ],
    'no-sequences': [
      'warn',
    ],
    'no-useless-concat': [
      'error',
    ],
    'no-useless-return': [
      'warn',
    ],
    'strict': [
      'error',
    ],
    'no-catch-shadow': [
      'error',
    ],
    'no-shadow': [
      'error',
    ],
    'no-use-before-define': [
      'error',
    ],
    'global-require': [
      'error',
    ],
    'array-bracket-newline': [
      'warn',
    ],
    'array-bracket-spacing': [
      'error',
    ],
    'block-spacing': [
      'error',
    ],
    'brace-style': [
      'error',
    ],
    'camelcase': [
      'error',
    ],
    'comma-dangle': [
      'error',
      'always',
    ],
    'capitalized-comments': [
      'warn',
    ],
    'comma-spacing': [
      'warn',
    ],
    'comma-style': [
      'warn',
    ],
    'eol-last': [
      'warn',
    ],
    'func-names': [
      'error',
    ],
    'new-parens': [
      'error',
    ],
    'no-lonely-if': [
      'error',
    ],
    'no-mixed-operators': [
      'error',
    ],
    'no-trailing-spaces': [
      'error',
    ],
    'no-unneeded-ternary': [
      'error',
    ],
    'one-var': [
      'error',
      'never',
    ],
    'space-before-function-paren': [
      'error'
    ],
    'space-before-blocks': [
      'error',
    ],
    'space-in-parens': [
      'error',
    ],
    'arrow-body-style': [
      'error',
    ],
    'arrow-parens': [
      'error',
    ],
    'arrow-spacing': [
      'error',
    ],
    'no-var': [
      'error',
    ],
    'prefer-const': [
      'error',
    ],
    'prefer-template': [
      'error',
    ],
    'space-infix-ops': [
      'error',
    ],
    'space-unary-ops': [
      'error',
    ],
    'spaced-comment': [
      'error',
    ],
    'quote-props': [
      'error',
    ],
    'require-jsdoc': [
      'error',
    ],
    'func-style': [
      'warn',
      'declaration',
    ],
    'padded-blocks': [
      'warn',
    ],
  },
};
