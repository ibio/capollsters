const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = env => {
	const CONFIG = {
    resolve: {
      //https://webpack.js.org/guides/migrating/#resolve-root-resolve-fallback-resolve-modulesdirectories
      modules: [
        'node_modules',
        path.resolve('./app')
      ],
      //http://webpack.github.io/docs/configuration.html#resolve-alias
      alias: {
        lib: path.resolve('./lib'),
        res: path.resolve('./res'),
        style: path.resolve('./style'),
      },
      extensions: ['.js', '.jsx']
    },
  	entry: {
      app: path.resolve('./app') + '/' + 'main.js',
      // vendor: ['react', 'react-dom', 'babel-polyfill', 'lodash', 'jquery', 'bootstrap-sass', path.resolve('./app') + '/' + 'vendor.js'],
      vendor: ['react', 'react-dom', 'gsap', 'babel-polyfill', 'lodash', path.resolve('./app') + '/' + 'vendor.js'],
    },
    output: {path: path.resolve(__dirname, 'script'), publicPath:'script/', filename: '[name].bundle.js'},
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve('./'),
      openPage: './index.html',
      open: true,
      compress: true,
      port: 3000
    },
    module: {
      rules: [
        {
          test: [/.es6$/, /.jsx?$/],
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
        {
          test: /\.s?css$/,
          // https://github.com/webpack-contrib/css-loader
          use: extractSass.extract({
            use: [
              {loader: "css-loader", options: {sourceMap: true, minimize: true } },
              {loader: "sass-loader", options: {sourceMap: true, minimize: true } }
            ],
            // use style-loader in development
            fallback: "style-loader",
            // NOTICE: this is to solve duplicate path
            publicPath: './'
          })
        },
        {
          // https://github.com/webpack-contrib/url-loader
          // for small resources only, translate it to base64
          test: /\.(png|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {limit: 10000 }
        },
        {
          // https://github.com/webpack-contrib/file-loader
          test: /\.(jpg|jpeg)$/,
          loader:'file-loader'
        }
      ]
    },
    plugins: [
    	new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'[name].bundle.js', minChunks: Infinity}),
      // for bootstrap only
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery:"jquery"
      }),
      extractSass
    ]
  };

  // switch
  // https://webpack.js.org/guides/environment-variables/#src/components/Sidebar/Sidebar.jsx
  switch(env.CONFIG){
    case 'prod':
      CONFIG.plugins.push(
        new CleanWebpackPlugin(['script']),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new UglifyJSPlugin()
      )
      break;
    case 'dev':
      CONFIG.plugins.push(
        new HtmlWebpackPlugin({})
      )
    default:
      //
  }

  return CONFIG;
};
