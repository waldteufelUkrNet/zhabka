'use strict';
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES ↓↓↓ */
  const { src,
          dest,
          series,
          parallel,
          watch
        } = require('gulp');

  const bs      = require('browser-sync').create(),
        del     = require('del'),
        autopre = require('gulp-autoprefixer'),
        csso    = require('gulp-csso'),
        htmlmin = require('gulp-htmlmin'),
        notify  = require('gulp-notify'),
        pug     = require('gulp-pug'),
        rename  = require('gulp-rename'),
        scss    = require('gulp-sass')(require('sass')),
        uglify  = require('gulp-uglify-es').default;
/* ↑↑↑ /VARIABLES ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ TASKS (FRONTEND DEVELOPMENT) ↓↓↓ */
  // server for live reload
  function startBrowserSync() {
    bs.init({
      server : {
        baseDir : 'app/',
        index: 'workpage.html'
      },
      notify: false
    });
  }
  module.exports.startBrowserSync = startBrowserSync;

  // workpage: pug -> html
  function convertWorkPage(){
    return src('app/workpage.pug')
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
          .pipe( dest('app/') );
  }
  module.exports.convertWorkPage = convertWorkPage;

  // pages: pug -> html
  function convertPug(){
    return src('app/pages/*.pug')
           .pipe(pug({
             pretty : true
           }))
           .on('error', notify.onError({
             message : 'Error: <%= error.message %>',
             title   : 'PUG error'
           }))
           .pipe( dest('app/pages/') );
  }
  module.exports.convertPug = convertPug;

  // modules: scss -> css
  function convertSCSSModules() {
    return src('app/modules/*/*.scss')
           .pipe( scss({outputStyle: 'compressed'}) ) // nested expanded compact compressed
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'SASS error'
            }))
           .pipe (autopre ({overrideBrowserslist: ['last 10 version'], grid: 'autoplace'}) )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'Autoprefixer error'
            }))
           .pipe( dest('app/modules/') )
           .pipe( bs.stream() );
  }
  module.exports.convertSCSSModules = convertSCSSModules;

  // pages: scss -> css
  function convertSCSS() {
    return src('app/scss/*.scss')
           .pipe( scss({outputStyle: 'expanded'}) ) // nested expanded compact compressed
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'SASS error'
            }))
           .pipe (autopre ({overrideBrowserslist: ['last 10 version'], grid: 'autoplace'}) )
           .on('error', notify.onError({
              message : 'Error: <%= error.message %>',
              title   : 'Autoprefixer error'
            }))
           .pipe( dest('app/css/') )
           .pipe( bs.stream() );
  }
  module.exports.convertSCSS = convertSCSS;

  // modules: js -> min.js
  function minimizeJSModules() {
    return src(['app/modules/*/*.js', '!app/modules/*/*.min.js'])
           .pipe( uglify() )
           .pipe( rename( function(path){
              path.basename += '.min';
           } ) )
           .pipe( dest('app/client/modules/') );
  }
  module.exports.minimizeJSModules = minimizeJSModules;

  // watching & live reload
  function startWatch(){
    watch(['app/workpage.pug'], convertWorkPage);
    watch(['app/pages/*.pug', 'app/modules/*/*.pug', 'app/modules/*/*.css', 'app/modules/*/*.js'], convertPug);
    watch(['app/modules/*/*.scss'], convertSCSSModules);
    watch(['app/modules/*/*.js', '!app/modules/*/*.min.js'], minimizeJSModules, bs.reload );
    watch(['app/js/*.js'], bs.reload );
    watch(['app/scss/*.scss'], convertSCSS);
    watch(['app/pages/*.html', 'app/workpage.html']).on('change',  bs.reload);
  }
  module.exports.startWatch = startWatch;

  // чищення каталогу dist
  function clean() {
    return del('dist/');
  }
  module.exports.clean = clean;

  function copyFiles(done) {
    src('app/img/**/*').pipe( dest('dist/img/') );
    src('app/fonts/**/*').pipe( dest('dist/fonts/') );
    src('app/css/**/*').pipe( csso() ).pipe( dest('dist/css/') );
    src('app/js/**/*').pipe( uglify() ).pipe( dest('dist/js/') );
    src('app/pages/**/*.html').pipe( htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeComments: true,
    }) ).pipe( dest('dist/pages/') );

    done();
  }
  module.exports.copyFiles = copyFiles;

  module.exports.default = series(convertSCSSModules, convertSCSS, minimizeJSModules, convertPug, convertWorkPage, parallel(startBrowserSync, startWatch));
  module.exports.build = series( clean, copyFiles);
/* ↑↑↑ /TASKS (FRONTEND DEVELOPMENT) ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////