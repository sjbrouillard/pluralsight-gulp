var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var util = require('gulp-util');
var gulpprint = require('gulp-print');

gulp.task('vet', function() {
    log('Analyzing source code with JSHint and JSCS');
    return gulp.src([
        './src/**/*.js',
        './*.js'
    ])
    .pipe(gulpprint())
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jscsStylish.combineWithHintResults())
    //If you want CI to fail the build, just use .pipe(jshint.reporter('fail))
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

/////////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}
