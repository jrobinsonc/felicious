module.exports = {
    'extends': 'airbnb-standard',

    'parserOptions': {
        'ecmaVersion': 9,
        'ecmaFeatures': {
            'impliedStrict': true
        }
    },

    'rules': {
        'arrow-body-style': 0,
        'import/order': 0,
        'indent': [1, 4, {'SwitchCase': 1}],
        'no-continue': 0,

        // We need a correct documentation for our scripts.
        'valid-jsdoc': [1, {
            'matchDescription': '.+',
            'prefer': {
                'returns': 'return',
                'property': 'prop'
            },
            'requireParamDescription': true,
            'requireParamType': true,
            'requireReturn': true,
            'requireReturnDescription': false,
            'requireReturnType': true
        }],
        "require-jsdoc": [1, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true,
                "ArrowFunctionExpression": true,
                "FunctionExpression": true
            }
        }]
    },

    'overrides': [
        {
            'files': ['gulp/**/*.js', 'gulpfile.js', 'codecept.conf.js'],
            'rules': {
                'import/no-extraneous-dependencies': 0,
                'global-require': 0,
                'import/no-dynamic-require': 0,
                'no-param-reassign': 0,
            }
        }
    ]
};
