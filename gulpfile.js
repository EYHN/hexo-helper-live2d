var gulp = require('gulp');
var uglify = require('gulp-uglify');//js压缩
var notify = require('gulp-notify');//提示信息
var concat = require('gulp-concat');

gulp.task('default',['js'],function(){
})

gulp.task('js', function() {
  return gulp.src(['./src/live2d.min.js',
  './src/Live2DFramework.js',
  './src/utils/MatrixStack.js',
  './src/utils/ModelSettingJson.js',
  './src/PlatformManager.js',
  './src/LAppDefine.js',
  './src/LAppModel.js',
  './src/LAppLive2DManager.js',
  './src/main.js'])
    .pipe(concat('live2d.js'))
    .pipe(gulp.dest('dest'))
    .pipe(uglify())
    .pipe(gulp.dest('dest'))
    .pipe(notify({ message: 'js task ok' }));
});