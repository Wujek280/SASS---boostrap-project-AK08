var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');


// autorefresh
gulp.task('browserSync', function() {
   'use strict';
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

/* Kompilacja plików scss do css */
gulp.task('sass', function(){
	return gulp.src('app/scss/main.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

//kopiowanie do /dist CSS i mumifikacjia
gulp.task('cssnano', function(){
   return gulp.src('app/**/*.css')
   .pipe(cssnano())
   .pipe(gulp.dest('dist')); 
});

//kopiowanie do /dist html'ów
gulp.task('dist', function(){
   return gulp.src('app/**/*.html')
   .pipe(gulp.dest('dist'));   
});

//
gulp.task('uglifyjs', function(){
   return gulp.src('app/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('dist/js'));   
});

//////////////////////////////////
/* Obserwowanie zmian w plikach */
//////////////////////////////////
gulp.task('build', ['browserSync', 'sass', 'cssnano'], function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
});