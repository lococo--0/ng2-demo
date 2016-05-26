fis.set('project.ignore', [
  'dist/**',
  'node_modules/**',
  '*.*',
]);

fis.hook('commonjs', {
    extList: ['.js', '.ts']
});
fis.unhook('components');
fis.hook('node_modules');

fis.match('src/**.ts', {
  parser: fis.plugin('typescript'),
  preprocessor: fis.plugin('ng2-inline'),
  rExt: '.js'
}).match('**.{js,ts}', {
  isMod: true,
}).match('**.scss', {
  parset: fis.plugin('node-sass'),
  rExt: '.css'
}).match('{src/main.ts, node_modules/reflect-metadata/**, node_modules/zone.js/**}', {
  isMod: false,
}).match('**/mod.js', {
  packOrder: -1,
  isMod: false,
}).match('node_modules/**', {
  optimizer: fis.plugin('uglify-js'),
  packTo: '/pkgs/lib.js'
}).match('src/index.html', {
  release: 'index.html'
})

fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    // allInOne: true
  })
});
