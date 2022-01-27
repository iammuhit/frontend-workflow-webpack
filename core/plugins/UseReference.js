const HtmlWebpackPlugin = require('html-webpack-plugin');
const useref = require('useref');

class UseReferenceWebpackPlugin {

    constructor(options = {}) {
        this.options = options;
    }
    
    apply (compiler) {
        compiler.hooks.compilation.tap('UseReferenceWebpackPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('UseReferenceWebpackPlugin', (data, callback) => {
                data.html = useref(data.html, this.options).find(e => true);
                callback(null, data);
            });
        });
    }
}

module.exports = UseReferenceWebpackPlugin;
