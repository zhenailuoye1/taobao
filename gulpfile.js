/**
 * Created by Yami on 2016/9/20.
 */

var gulp = require('gulp'),
    //minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    //rev = require('gulp-rev-append'),
    clean = require('gulp-clean'),
    //del = require('del'),
    //autoprefixer = require('gulp-autoprefixer'),
    assetRev = require('gulp-asset-rev'),
    replace = require('gulp-replace'),
    clean_css = require('gulp-clean-css'),
    sass = require("gulp-sass")
    ;



gulp.task('js', function() {

     gulp.src(['src/js/*', 'src/js/android.js'])


        //.pipe(concat('all.js'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(assetRev())
        //输出压缩文件到指定目录
        .pipe(gulp.dest('dist/js/'))
        //提醒任务完成
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('img', function() {
     gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'))
        .pipe(assetRev())
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('css', function() {
     gulp.src('src/css/*.css')
        .pipe(clean_css())
        .pipe(assetRev())
        //.pipe(concat('app.css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Css task complete' }));
});

gulp.task('sass', function() {
     gulp.src('src/css/*.scss')
        .pipe(sass(
        )
            .on('error', sass.logError))
        .pipe(clean_css())
        .pipe(assetRev())
        //.pipe(concat('app.css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Css task complete' }));
});

gulp.task('rev', function () {
    gulp.src(['src/*.html'])
        .pipe(assetRev())
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'Assets rev task complete' }));
});




gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('src/img/**/*', ['img','rev']);
    gulp.watch('src/js/**/*', ['js','rev']);
    gulp.watch('src/css/**/*', ['sass','rev']);

});

gulp.task('default', ['js','img', 'css', 'sass', 'rev']);