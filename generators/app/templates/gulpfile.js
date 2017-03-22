var gulp = require('gulp');
var copy = require('copy');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var htmlReplace = require('gulp-html-replace');

// 配置
var config = {
    baseDir: './app',
    devDir: './app/src',
    buildDir: './app/dest'
}

// 开启本地服务器并监听
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: config.baseDir
        },
        port: '8001',
        open: false
    });
    gulp.watch(config.devDir + '/sass/*.scss', ['compass']);
    gulp.watch(config.devDir + '/js/*.js', ['concatMain']);
    gulp.watch(['tmpl/*.html', 'js/**/*.js'], { cwd: config.devDir }, reload); // NOTE: 这里cwd自带了 /，所以要去掉路径前面的 /
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
        .pipe(reload({ stream: true }))
});
// build-css
gulp.task('build-css', function() {
    gulp.src(config.devDir + '/css/main.css', { base: config.devDir })
        .pipe(rename(function(path) {
            var date = new Date();
            path.basename += '_' + date.getTime();
        }))
        .pipe(gulp.dest(config.buildDir))
});

// concat js
gulp.task('concatMain', function() {
    gulp.src([config.devDir + '/js/_utilFn.js', config.devDir + '/js/_config.js', config.devDir + '/js/_main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.devDir + '/js'))
        .pipe(reload({ stream: true }))
});
// build-js
gulp.task('build-js', function() {
    gulp.src(config.devDir + '/js/main.js', { base: config.devDir })
        .pipe(uglify())
        .pipe(rename(function(path) {
            var date = new Date();
            path.basename += '_' + date.getTime();
        }))
        .pipe(gulp.dest(config.buildDir));

    copy([config.devDir + '/js/lib/*.js'], config.buildDir + '/js/lib', function(err, files) {
        if (err) throw err;
    });
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
    copy([config.devDir + '/tmpl/**/*'], config.buildDir + '/tmpl', function(err, files) {
        if (err) throw err;
    });
});

// clean （注：npm本身的del会有执行顺序的问题哦，不管del是先执行还是后执行，多运行几次就会报错）
gulp.task('clean', function() {
    return gulp.src(config.buildDir + '/*', { read: false })
        .pipe(clean());
});

// default
gulp.task('default', ['server', 'compass', 'concatMain']);

// build
gulp.task('build', ['clean'], function() {
    gulp.start('build-css', 'build-js', 'build-image', 'build-html');
});