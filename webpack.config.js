const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack'); 
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
}

const uglifyConfig = {
  sourceMap: false,
  warnings: false,
  mangle: true,
  minimize: true
}

const htmlConfig = {
  template: path.join(paths.src, 'index.html'),
  minify : {
    collapseWhitespace: true
  }
}

const common = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:7081',
    'webpack/hot/only-dev-server',
    path.join(paths.src, 'index.js')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react"
            ],
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel']
          }
        }
      },
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false,
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ],
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.build]),
    new HtmlWebpackPlugin(htmlConfig),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};

const devSettings = {
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([paths.build])
  ]
}

const prodSettings = {
  devtool: 'source-map',
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/build/'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify('production')
    }}),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

/**
* Exports
**/

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if (TARGET === 'start') {
  module.exports = merge(common, devSettings)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(common, prodSettings)
}