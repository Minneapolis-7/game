module.exports = function conf(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = ['@babel/plugin-transform-runtime'];

  return {
    sourceMaps: true,
    presets,
    plugins,
  };
};
