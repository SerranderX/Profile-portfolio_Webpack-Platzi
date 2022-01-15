const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DotEnv = require('dotenv-webpack'); // plugin de configuracion - variables de entorno 

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist_[dev]'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module:{
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext]",
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }]
        }),
        new DotEnv(),
    ],
    // La configuracion de optimizacion de css y terser se puede omitir
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({}),
    //         new CssMinimizerPlugin({})
    //     ]
    // }
}