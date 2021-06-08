const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src('src/sass/**/*.+(scss|sass)')
            .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: '',
                suffix: '.min',
            }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('css'))
            .pipe(browserSync.stream());
})

gulp.task('watch', function(){
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('./'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
            .pipe(gulp.dest('js/'));
});
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('fonts/'));
});
gulp.task('ico', function() {
    return gulp.src('src/img/ico/*')
            .pipe(gulp.dest('img/ico/'));
});
gulp.task('images', function() {
    return gulp.src('src/img/bg/*')
            .pipe(imagemin())
            .pipe(gulp.dest('img/bg/'));
});

gulp.task('default', gulp.parallel('watch','browser-sync', 'styles', 'html', 'scripts', 'fonts', 'ico', 'images')) 