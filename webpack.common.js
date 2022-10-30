const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFedereationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const remotes = require('./remotes.config');

const publicPath = `${process.env.PUBLIC_PATH}/`;
const fileSafeDateUTC = () => new Date().toISOString().replace(/:/g, '.');

module.exports = {
  entry: {
    main: {
      filename: 'main.[contenthash].js',
      import: './src/index.ts',
    },
    ssEntry: {
      filename: 'ssEntry.js',
      import: './src/root.component.tsx',
      library: { type: 'umd' },
    }
  },

  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },

  output: {
    filename: 'static/bundles/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    chunkFilesname: 'static/bundles/[id].[contenthash].js',
    library: {type: 'umd'},
    clean: true,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {transpileOnly: true},
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ]
          }
        }
      },
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resourse',
        generator: {
          filename: 'static/images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new ModuleFedereationPlugin({
      name: 'appNav',
      filename: 'remoteEntry.js',
      remotes: {...remotes},
      exposes: {
        '.': './src/root.component',
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.', globOptions: { ignore: '**/index.html' } },
      ]
    }),
    new ForkTsCheckerPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
      generateStatsFile: true,
      statsFilename: `${path.resolve(__dirname, 'reporters')}/stats_${fileSafeDateUTC()}.json`,
    })
  ]
}