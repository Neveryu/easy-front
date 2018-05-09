'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
//编译sass文件
var gulpScss = require('gulp-sass'); 

//编译后存放目录
var path = {
  scss : './scss/',
  css : './css/',
  html : '',
  js : './js/'
};

//建立一个叫scss-monitor的任务
gulp.task('scss-monitor',function() {
  gulp.src(path.scss + '*.scss')
      .pipe(gulpScss().on('error',gulpScss.logError))
      .pipe(gulp.dest(path.css));
  reload();
});

//监听scss样式文件
gulp.task('scssAndWatch',function() {
  browserSync.init({
    server: './'
  });
  gulp.watch(path.scss + '*.scss',['scss-monitor']);
  gulp.watch(path.html + '*.html').on('change',reload);
  gulp.watch(path.css + '*.css').on('change',reload);
  gulp.watch(path.js + '*.js').on('change',reload);
});

gulp.task('default',['scssAndWatch']);

gulp.task('help',function () {
  console.log('----------------- 开发环境 -----------------');
  console.log('gulp default   开发环境（默认任务）');
  console.log('gulp html    HTML处理');
  console.log('gulp sass    样式处理');
  console.log('gulp script    JS文件压缩&重命名');
  console.log('gulp images    图片压缩');
  console.log('gulp concat    文件合并');
  console.log('---------------- 发布环境 ------------------');
  console.log('gulp release   打包发布');
  console.log('gulp clean   清理文件');
  console.log('gulp sassRelease 样式处理');
  console.log('gulp scriptRelease 脚本压缩&重命名');
  console.log('--------------------------------------------');
});