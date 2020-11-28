const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer:{
        before: function(app, server){
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3100,
        host: "0.0.0.0"
    },
    mode: 'development',
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:3100/'
            },
            {reload: false}
        )
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader?url=false',
                    {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}
                ]
            },
            {
                test: /\/(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    }
                ]
            }
        ]
    }
}