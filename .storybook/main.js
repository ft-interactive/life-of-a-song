const { dirname, resolve } = require('path');

module.exports = {
  stories: [
    '../app/components/**/*.stories.mdx',
    '../app/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../node_modules/@financial-times/g-components/src/**/*.stories.@(js|mdx)',
  ].filter((i) => i),
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: (config) => {
    return config;
  },
  webpackFinal: async (config, { configType }) => {
    // Transpile dependencies from @financial-times scope
    config.module.rules[0].exclude = /node_modules\/(?!@financial-times)/;

    // Add Sass support
    config.module.rules.push({
      test: /\.scss$/,
      resolve: {
        extensions: ['.scss', '.sass'],
      },
      use: [
        'style-loader',
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: ['node_modules', 'node_modules/@financial-times'],
          },
        },
      ],
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@financial-times/g-components': resolve(
        dirname(require.resolve('@financial-times/g-components/package.json')),
        'src'
      ),
    };

    return config;
  },
};
