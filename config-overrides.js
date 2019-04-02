const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#C0C0EC' },
 }),
  // addBabelPlugins(
  //   [
  //     "@babel/plugin-proposal-decorators",
  //     {
  //       "legacy": true
  //     }
  //   ]
  // ),
  addDecoratorsLegacy()

);