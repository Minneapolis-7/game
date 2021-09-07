module.exports = function conf(api) {
  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = ['@babel/plugin-transform-runtime'];

  if (api.env('test')) {
    plugins.push('@babel/plugin-transform-modules-commonjs');
  }

  return {
    sourceMaps: true,
    presets,
    plugins,
  };
};
