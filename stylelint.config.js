module.exports = {
    extends: ['stylelint-config-recommended'],
    rules: {
        'at-rule-no-unknown': [true, {
            ignoreAtRules: [
                'tailwind',
                'apply',
                'variants',
                'responsive',
                'screen',
                '/^fa-font-/',
            ]
        }],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        'no-empty-source': null,
        'no-invalid-position-at-import-rule': null,
    }
};
