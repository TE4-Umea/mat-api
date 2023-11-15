module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            0,
            4
        ],
        'linebreak-style': [
            0,
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            2,
            'always'
        ],
        'no-unused-vars': [
            0
        ],
    }
};
