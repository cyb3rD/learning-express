var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var wiredep = require('wiredep').stream;

var jsFiles = ['*.js', 'src/**/*.js'];
var htmlFiles = ['src/views/*.html'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('inject', function() {
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    return gulp.src(htmlFiles)
        .pipe(wiredep(options))
        .pipe(gulp.dest('./src/views'));
});
