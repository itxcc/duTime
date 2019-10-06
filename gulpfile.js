var gulp = require('gulp'),
  clean = require('gulp-clean'),
  del = require('del'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename')
  concat = require('gulp-concat')
  cleanJS = require('gulp-uglifyes')
  imagemin = require('gulp-imagemin') //压缩图片



gulp.task('clean', function(){
  // return gulp.src('./dist/?(components|pages)', { read : false})
  //         .pipe(clean())
  return del([
    './dist/?(components|pages|template|utils|packages|controller)/**/*.scss',
    './dist/?(components|pages|template|utils|packages|controller)/**/*.wxss',
    './dist/?(components|pages|template|utils|packages|controller)/**/*.wxml',
    './dist/?(components|pages|template|utils|packages|controller)/**/*.js',
    './dist/?(components|pages|template|utils|packages|controller)/**/*.json',
    './dist/app.js',
    './dist/app.json',
    './dist/app.scss',
    './dist/static/image/**/*.*'
  ])
})
gulp.task('copy', ['clean'], function() {
  return gulp.src(['./src/?(components|pages|assets|template|packages|static)/**/*', './src/app.js', './src/app.json', './src/app.scss'])
    .pipe(gulp.dest('./dist'))
})
gulp.task('initStyle', ['copy'], function(){
  return gulp.src('./dist/**/*.scss', { base: 'client' })
            .pipe(sass())
            .pipe(rename(function(path){
              path.extname = '.wxss'
            }))
            .pipe(gulp.dest('./dist'))
})

gulp.task('once', ['init'], function() {
  return gulp.src(['./src/?(utils|controller|template)/**/*'])
    .pipe(gulp.dest('./dist'))
})

gulp.task('init', ['initStyle'], function(){
  del([
    './dist/**/*.scss'
  ])
  gulp.src('./dist/assets', { read : false})
    .pipe(clean())
})

gulp.task('dev', ['once'], function(){
  return gulp.watch('./src/**/*',['once'])
})

gulp.task('devSit', ['once', 'sit'], function(){
  return gulp.watch('./src/**/*',['init', 'sit'])
})

gulp.task('sit', function(){
  return gulp.src(['src/config/env-sit.js','src/config/api.js'])
            .pipe(concat('apiUrl.js'))
            .pipe(gulp.dest('src/utils'))
            .pipe(gulp.dest('dist/utils'))
})

gulp.task('devUat', ['once', 'uat'], function(){
  return gulp.watch('./src/**/*',['init', 'uat'])
})

gulp.task('uat', function(){
  return gulp.src(['src/config/env-uat.js','src/config/api.js'])
            .pipe(concat('apiUrl.js'))
            .pipe(gulp.dest('src/utils'))
            .pipe(gulp.dest('dist/utils'))
})

gulp.task('devPro', ['once', 'pro'], function(){
  return gulp.watch('./src/**/*',['init', 'pro'])
})

gulp.task('pro', function(){
  return gulp.src(['src/config/env-pro.js','src/config/api.js'])
          .pipe(concat('apiUrl.js'))
          .pipe(gulp.dest('src/utils'))
          .pipe(gulp.dest('dist/utils'))
})

gulp.task('build',['once'], function() {
  del([
    './dist/**/*.scss'
  ])
  gulp.src('./dist/assets', { read : false})
    .pipe(clean())
  return gulp.src(['./dist/**/*.js'])
          .pipe(cleanJS({
            compress:{
              drop_console:true
            }
          }))
          .pipe(gulp.dest('./dist'))
})
/**
   处理图片
**/
gulp.task('images', function() {
  gulp.src('src/static/image/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/static/image'))
});
