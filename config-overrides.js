const { override, fixBabelImports, addLessLoader,addBabelPlugins } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#0000f0' },
 }),
  addBabelPlugins(
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  )
);