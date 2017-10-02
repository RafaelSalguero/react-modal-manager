const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require("path");
const webpack = require('webpack');
const production = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
];

const config = {
    entry: ["test/index.tsx"],
    output: {
        path: __dirname + "/www",
        filename: "bundle.js",
        devtoolModuleFilenameTemplate: "./[resource-path]"
    },
    resolve: {
        modules: [
            path.resolve("."),
            "node_modules",
        ],
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: "test/tsconfig.json"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "test/index_template.html",
            filename: "index.html",
            hash: true
        })
    ]
}

module.exports = config;