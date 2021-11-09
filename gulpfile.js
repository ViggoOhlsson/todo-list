var gulp = require('gulp');
var sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('compile', function() {
    return gulp.src('scss/main.scss').pipe(sass()).pipe(gulp.dest('css'))
});

gulp.task('minify-js', function() {
    return gulp.src('js/main.js').pipe(uglify()).pipe(gulp.dest('minified'))
});

gulp.task('minify-css', function() {
    return gulp.src('css/main.css').pipe(cleanCSS()).pipe(gulp.dest('minified'))
});

gulp.task('watch', function() {
    gulp.watch("scss/main.scss", gulp.series('compile'));
    gulp.watch("css/main.css", gulp.series('minify-css'));
    gulp.watch("js/main.js", gulp.series('minify-js'));
});

gulp.task('default', gulp.series('compile', 'minify-js', 'minify-css', 'watch'), function(){});

//install order
// npm install -global gulp-cli
// npm install gulp@4.0.2
// npm install gulp-sass@4.0.2