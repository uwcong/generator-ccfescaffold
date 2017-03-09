var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var del = require('del');

// 配置
var config = {
    baseDir: 'app',
    devDir: 'app/src',
    buildDir: 'app/dest'
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

// compass
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

// concat js
gulp.task('concatMain', function() {
    gulp.src([config.devDir + '/js/_utilFn.js', config.devDir + '/js/_config.js', config.devDir + '/js/_main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.devDir + '/js/'))
        .pipe(reload({ stream: true }))
});

// clean
gulp.task('clean', function(cb) {
    del([config.buildDir]);
    cb();
});

// 默认任务
gulp.task('default', ['server', 'compass', 'concatMain']);