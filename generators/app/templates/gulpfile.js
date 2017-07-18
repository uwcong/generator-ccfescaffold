var gulp = require('gulp');
var copy = require('copy');
var connect = require('gulp-connect');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var htmlReplace = require('gulp-html-replace');
var stripDebug = require('gulp-strip-debug');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
// var sourcemaps  = require('gulp-sourcemaps');

// 配置
var config = {
    baseDir: 'app',
    devDir: 'app/src',
    buildDir: 'app/dest'
}

// 开启本地服务器并监听
gulp.task('DevServer', function() {
    connect.server({
        root: config.devDir,
        host: 'localhost',
        port: 8000,
        livereload: true
    });
});
gulp.task('BuildServer', function() {
    connect.server({
        root: config.buildDir,
        host: 'localhost',
        port: 8001,
        livereload: false
    });
});

// reload
gulp.task('reload', function() {
    gulp.src(config.devDir + '/**/*')
        .pipe(connect.reload());
});

// clean （注：npm本身的del会有执行顺序的问题哦，不管del是先执行还是后执行，多运行几次就会报错）
gulp.task('clean', function() {
    return gulp.src(config.buildDir + '/*', { read: false })
        .pipe(clean());
});

// compass css
gulp.task('compass', function() {
    gulp.src(config.devDir + '/sass/*.scss')
        .pipe(plumber()) // 解决编译出错时gulp强制退出的问题
        .pipe(compass({
            css: config.devDir + '/css',
            sass: config.devDir + '/sass',
            image: config.devDir + '/images',
            style: 'compressed',
        }))
        .pipe(connect.reload());
});

// concat js
gulp.task('concatMain', function() {
    gulp.src([config.devDir + '/js/module/_utilFn.js', config.devDir + '/js/module/_config.js', config.devDir + '/js/module/_main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.devDir + '/js'))
        .pipe(connect.reload());
});

// es6demo
gulp.task('es6demo', function() {
    return browserify({
        entries: config.devDir + '/js/module/_demo.js',
        debug: true
    })
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source('demo.js'))
    // .pipe(buffer())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    // .pipe(sourcemaps.write('./maps', {addComment: false}))
    .pipe(gulp.dest(config.devDir + '/js'))
    .pipe(connect.reload());
});

// build-css
gulp.task('build-css', function() {
    gulp.src(config.devDir + '/css/*.css', { base: config.devDir })
        .pipe(rename(function(path) {
            var date = new Date();
            // path.basename += '_' + date.getTime(); // 模板还是后端控制，所以重命名暂不做
        }))
        .pipe(gulp.dest(config.buildDir));

    copy([config.devDir + '/css/lib/**/*.css'], config.buildDir + '/css/lib', function(err, files) {
        if (err) throw err;
    });
});

// build-js
gulp.task('build-js', function() {
    gulp.src(config.devDir + '/js/*.js', { base: config.devDir })
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename(function(path) {
            var date = new Date();
            // path.basename += '_' + date.getTime(); // 模板还是后端控制，所以重命名暂不做
        }))
        .pipe(gulp.dest(config.buildDir));

    // copy([config.devDir + '/js/lib/**/*.js'], config.buildDir + '/js/lib', function(err, files) {
    //     if (err) throw err;
    // });
});

// build-image
gulp.task('build-image', function() {
    gulp.src(config.devDir + '/images/**/*.{png,jpg,jpeg,gif,ico,webp,svg}', { base: config.devDir })
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.buildDir));
});

// build-html
gulp.task('build-html', function() {
    copy([config.devDir + '/tmpl/**/*.html'], config.buildDir + '/tmpl', function(err, files) {
        if (err) throw err;
    });
});

// watch
gulp.task('watch', function() {
    gulp.watch(config.devDir + '/sass/**/*.scss', ['compass']);
    // gulp.watch(config.devDir + '/js/module/*.js', ['concatMain']);
    gulp.watch(config.devDir + '/js/module/**/*.js', ['es6demo']);
    gulp.watch(config.devDir + '/**/*', ['reload'])
        .on('change', function(event) {
            var changedFilePath = config.devDir + event.path.split(config.devDir)[1];
            console.log('Changed File: ' + event.path);
        });
});

// default
gulp.task('default', ['DevServer', 'BuildServer', 'compass', 'es6demo', 'watch']);

// build
gulp.task('build', ['clean'], function() {
    gulp.start('build-css', 'build-js', 'build-image', 'build-html');
});