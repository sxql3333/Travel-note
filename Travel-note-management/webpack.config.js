const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Set the mode to 'development' or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images', // 图片输出的目录
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    // proxy: [{
    //   '/api': {
    //     target: 'http://localhost:5000', // 设置目标服务器的地址
    //     secure: false, // 如果目标服务器是https，需要将secure设置为false
    //     changeOrigin: true // 设置changeOrigin为true，以便正确处理跨域请求
    //   }
    // }]
    // proxy: [
    //   {
    //     context: ['/api'],
    //     target: 'http://127.0.0.1:5000', // 设置目标服务器的地址
    //     secure: false, // 如果目标服务器是https，需要将secure设置为false
    //     changeOrigin: true // 设置changeOrigin为true，以便正确处理跨域请求
    //   }
    // ]
  }
};