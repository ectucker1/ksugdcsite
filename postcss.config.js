module.exports = {
    syntax: 'postcss-scss',
    plugins: {
        'postcss-import': {},
        'postcss-simple-vars': {},
        autoprefixer: {},
        cssnano: {
            preset: 'default'
        }
    }
}
