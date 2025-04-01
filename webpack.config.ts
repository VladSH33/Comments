import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as WebpackConfiguration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config = (isDev: boolean): Configuration => ({
  entry: path.resolve(__dirname, 'src', 'app', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    preferAbsolute: true,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resPath: string) => resPath.includes('.module.'),
                localIdentName: isDev
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:8]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    ...(isDev
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
          }),
        ]),
    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
});

export default config;
