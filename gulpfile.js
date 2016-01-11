var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins') ({lazy: true});

gulp.task('vet', function() {
    log('Analyzing source code with JSHint and JSCS');
    return gulp.src(config.alljsfiles)
    .pipe($.if(args.verbose,$.print()))
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jshint())
    //If you want CI to fail the build, just use .pipe(jshint.reporter('fail))
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

/////////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
