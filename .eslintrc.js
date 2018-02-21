module.exports = {
    'extends': 'eslint:recommended',

    'env': {
        'node': true,
        'browser': true,
        'commonjs': true,
        'shared-node-browser': true,
        'es6': true,
        'worker': true,
        'serviceworker': true
    },

    // 'globals': {
    //     'Scenario': true,
    //     'actor': true,
    //     'Feature': true
    // },

    'parserOptions': {
        'ecmaVersion': 8,
        'ecmaFeatures': {
            'impliedStrict': true
        }
    },

    'rules': {
        'array-bracket-spacing': 2,
        'block-scoped-var': 2,
        'brace-style': [1, '1tbs', {'allowSingleLine': true}],
        'comma-dangle': 2,
        'comma-spacing': 2,
        'computed-property-spacing': 2,
        'curly': 2,
        'eol-last': 2,
        'eqeqeq': [2, 'smart'],
        'guard-for-in': 2,
        'indent': [1, 4, {'SwitchCase': 1}],
        'key-spacing': 1,
        'keyword-spacing': [2, {'before': true, 'after': true}],
        'linebreak-style': [2, 'unix'],
        'lines-around-comment': [2, {'beforeBlockComment': true, 'afterBlockComment': false}],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-console': 1,
        'no-var': 1,
        'no-catch-shadow': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-parens': [2, 'functions'],
        'no-implied-eval': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': 2,
        'no-lone-blocks': 2,
        'no-unreachable': 1,
        'no-loop-func': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-nested-ternary': 2,
        'no-new-func': 2,
        'no-new-object': 2,
        'no-new-wrappers': 2,
        'no-octal-escape': 2,
        'no-process-exit': 2,
        'no-proto': 2,
        'no-return-assign': 2,
        'no-script-url': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-trailing-spaces': 2,
        'no-undef-init': 2,
        'no-undefined': 2,
        'no-unused-expressions': 2,
        'no-unused-vars': [1, {'vars': 'all', 'args': 'none'}],
        'no-with': 2,
        'object-curly-spacing': [2, 'never'],
        'one-var': [2, 'never'],
        'quote-props': [2, 'consistent-as-needed'],
        'quotes': [1, 'single', 'avoid-escape'],
        'semi': [2, 'always'],
        'semi-spacing': [2, {'before': false, 'after': true}],
        'space-before-blocks': [1, 'always'],
        'space-before-function-paren': [1, {'anonymous': 'always', 'named': 'never'}],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
        'spaced-comment': [2, 'always'],
        'strict': 2,
        'yoda': [2, 'never'],
        'max-nested-callbacks': [1, 3],
        'valid-jsdoc': [1, {
            'prefer': {
                'returns': 'return',
                'property': 'prop'
            },
            'requireReturn': false
        }]
    }
};
