var _           = require('lodash');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var connect     = require('gulp-connect');
var uglify      = require('gulp-uglify');
var ghPages     = require('gulp-gh-pages');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var del         = require('del');
var runSequence = require('run-sequence');

var conf = {
    buildPath: './build',
    main: ['./src/index.js'],
    libs: [
        './node_modules/three/three.js',
        './node_modules/three/three.min.js',
        './node_modules/webvr-polyfill/build/webvr-polyfill.js',
        './node_modules/three/examples/js/controls/VRControls.js',
        './node_modules/three/examples/js/effects/VREffect.js'
    ],
    libsPath: './libs'
};

var MINIFY = _.includes(process.argv, '--minify');

gulp.task('build', function (done) {
    runSequence('clean', ['scripts'], done);
});

gulp.task('clean', function () {
    // return del([conf.buildPath]);
});

gulp.task('scripts', function () {
    var b = browserify(conf.main)
        // .external('threeSixty')
        .bundle();
    b.on('error', function (err) {
        console.error(err);
    });
    return b.pipe(source(MINIFY ? 'three-sixty.min.js' : 'three-sixty.js'))
        .pipe(buffer())
        .pipe(gulpif(MINIFY, uglify()))
        .pipe(gulp.dest(conf.buildPath));
});

gulp.task('libs', function () {
    return gulp.src(conf.libs)
        .pipe(gulp.dest(conf.libsPath));
});

gulp.task('connect', function () {
    return connect.server();
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['scripts']);
});

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});

gulp.task('default', ['build', 'libs', 'connect', 'watch']);
