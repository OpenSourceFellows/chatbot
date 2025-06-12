const { configs } = require('@eslint/js');
const pluginImport = require('eslint-plugin-import');
const globals = require('globals');

// Common configuration
const commonConfig = {
  languageOptions: {
    globals: {
      ...globals.node,
      __dirname: 'readonly',
      __filename: 'readonly',
      require: 'readonly',
      module: 'readonly',
      exports: 'writable'
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs'
    }
  },
  plugins: {
    import: pluginImport
  },
  rules: {
    // Basic JavaScript rules
    'no-console': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    
    // CommonJS-specific rules
    'global-require': 'off', // Disabled to prevent conflicts with import/newline-after-import
    'callback-return': 'off', // Disabled as it was causing circular fixes
    'handle-callback-err': 'off', // Disabled as it was causing issues
    
    // Best practices
    'eqeqeq': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-extra-bind': 'error',
    'no-param-reassign': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'no-useless-constructor': 'error',
    'no-dupe-else-if': 'error',
    'no-promise-executor-return': 'error',
    'no-unreachable-loop': 'error',
    'require-atomic-updates': 'error',
    
    // Async/await rules
    'no-return-await': 'error',
    'require-await': 'error',
    
    // Spacing rules
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' }
    ],
    
    // Import rules
    'import/no-commonjs': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-amd': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': ['error', { count: 1 }], // Changed from 2 to 1 to prevent conflicts
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never', // Changed from 'always' to prevent conflicts
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after'
          }
        ]
      }
    ]
  }
};

// Test configuration
const testConfig = {
  files: ['**/*.test.js', '**/*.spec.js', '**/jest.setup.js', '**/.jest/**'],
  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.jasmine
    }
  },
  rules: {
    'no-console': 'off',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'import/newline-after-import': 'off', // Disabled for test files
    'import/order': 'off' // Disabled for test files
  }
};

module.exports = [
  configs.recommended,
  commonConfig,
  testConfig
];