const webpackConfig = module.exports = {};

const PRODUCTION = process.env.NODE_ENV === 'production';

webpackConfig.entry = `${__dirname}/main.js`;

webpackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
  publicPath: '/',
};

webpackConfig.module = {
  rules: [
    {
      test: /\.(jpg|gif|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[hash].[ext]',
        },
      }],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [`${__dirname}/src/style`],
            },
          },
        ],
      }),
    },
  ],
};

webpackConfig.devServer = {
  historyApiFallback: true,
};
