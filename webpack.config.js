//Konfiguracja Webpack//Konfiguracja Webpack//Konfigura//Konfiguracja//Konfiguracja Webpack//Konfiguracja Webpack//Konfiguracja Webpack
const path = require('path');

module.exports = {
    entry: './js/App.jsx',
    output: {
        filename: 'out.js',
        path: path.resolve(__dirname, 'js')
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','stage-2']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
};
