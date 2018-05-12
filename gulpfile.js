const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass and inject into browser
gulp.task('sass', function(){
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS files to src/js
gulp.task('js', function(){
    return gulp.src(["node_modules/jquery/dist/jquery.min.js"])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Watch Sass and server
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch(["src/scss/*.scss"], ['sass']);
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Move Fonts folder to src/fonts
gulp.task('fonts', function () {
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function () {
    gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);