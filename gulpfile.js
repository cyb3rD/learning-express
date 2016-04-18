var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');

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
    var wiredep = require('wiredep').stream;
    var customInject = require('gulp-inject');

    var customInjectSrc = gulp.src(['./public/css/*css',
                                    './public/js/*.js'], {read: false});

    var customInjectOpts = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    return gulp.src(htmlFiles)
        .pipe(wiredep(options))
        .pipe(customInject(customInjectSrc, customInjectOpts))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Server restarting...');
        });
});
