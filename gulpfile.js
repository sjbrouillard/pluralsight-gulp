//Main Gulp package
var gulp = require('gulp');

var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var sequence = require('run-sequence');

var $ = require('gulp-load-plugins') ({lazy: true});

gulp.task('vet', function() {
    log('Analyzing source code with JSHint and JSCS');

    return gulp
        .src(config.alljsfiles)
        .pipe($.if(args.verbose,$.print()))
        .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jshint())
        //If you want CI to fail the build, just use .pipe(jshint.reporter('fail'))
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('clean-and-style', function(done) {
    sequence(
        'clean-styles',
        'styles',
        done
    );
});

gulp.task('styles', function() {
    log('Compiling LESS files --> CSS');

    return gulp
        .src(config.less)  //TODO add the config
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function() {
    var files = config.temp + '**/*.css';
    cleanFiles(files);
});

//////////////////////////////////////////////////
///                                            ///
///             Reusable Functions             ///
///                                            ///
//////////////////////////////////////////////////

function cleanFiles(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

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
