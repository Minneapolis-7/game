module.exports = function conf(api) {
  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [
    [
      '@babel/plugin-transform-typescript',
      {
        allowDeclareFields: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
  ];

  if (api.env('test')) {
    plugins.push('@babel/plugin-transform-modules-commonjs');
  }

  return {
    sourceMaps: true,
    presets,
    plugins,
  };
};
