module.exports = function conf(api) {
  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [];

  api.cache(true);

  return {
    sourceMaps: true,
    presets,
    plugins,
  };
};
