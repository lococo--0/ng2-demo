//只对src里面文件进行构建
fis.set('project.ignore', [
  'dist/**',
  'node_modules/**',
  '*.*',
]);

//开启对require的识别,并用define包裹被require的模块
fis.hook('commonjs', {
    extList: ['.js', '.ts']
}).hook('node_modules')
.unhook('components');

//所有通过script标签引入的js
var scriptRefs = [
  'src/main.ts',
  'node_modules/fis-mod/**',
  'node_modules/reflect-metadata/**',
  'node_modules/zone.js/**',
  'node_modules/es6-shim/**',
].join(',');

fis.match('**.ts', {
  parser: fis.plugin('typescript'),
  preprocessor: fis.plugin('ng2-inline'),
  rExt: '.js'
}).match('**.scss', {
  parser: fis.plugin('node-sass'),
  preprocessor: fis.plugin('cssprefixer'),
  rExt: '.css'
})
//默认所有js,ts被define包裹
.match('**.{js,ts}', {
  isMod: true,
//所有通过script标签引入的js, 不需要被define包裹
}).match('{' + scriptRefs + '}', {
  isMod: false,
}).match('node_modules/fis-mod/**', {
  packOrder: -1, //为了提供define,和require语法,在打包时需要放在最前面
})
//所有的node_modules打为一个包
.match('node_modules/**.js', {
  packTo: '/pkgs/lib.js'
})
.match('src/index.html', {
  release: 'index.html'
})
.match('**.{js, ts, css, scss, png, gif}', {
  useHash: true
})
.match('::packager', {
  packager: fis.plugin('map', {
    useTrack: false
  }),
  postpackager: fis.plugin('loader')
});


fis.media('prod')
.match('**.{js, ts}', {
  optimizer: fis.plugin('uglify-js')
}).match('**.{css, scss}', {
  optimizer: fis.plugin('clean-css')
}).match('**.png', {
  optimizer: fis.plugin('png-compressor', {
    type: 'pngquant'
  })
})
.match('::packager', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});
