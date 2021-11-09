var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');




gulp.task('compile', function() {
    return gulp.src('scss/main.scss').pipe(sass()).pipe(gulp.dest('css'))
});

gulp.task('minify-js', function () {
    return gulp.src('js/*.js').pipe(uglify()).pipe(gulp.dest('minified'))
});

gulp.task('minify-css', () => {
    return gulp.src('css/*.css').pipe(cleanCSS()).pipe(gulp.dest('minified'));
});

gulp.task('watch-scss', function() {
    gulp.watch("scss/main.scss", gulp.series('compile'));
});

gulp.task('default', gulp.series('compile', 'minify-js', 'minify-css', 'watch-scss'), function(){});

//install order
// npm install -global gulp-cli
// npm install gulp@4.0.2
// npm install gulp-sass@4.0.2