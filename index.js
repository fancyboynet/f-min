'use strict';
var path = require('path');
var program = require('commander');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var colors = require('colors');
var runSequence = require('run-sequence');
var pkg = require(path.join(__dirname, 'package.json'));

program
    .version(('v' + pkg.version).rainbow.underline)
    .option('-s, --src [src]', '要压缩的目录', './')
    .option('-d, --dest [dest]', '压缩文件存放的目录', './bulid');

var helpers = {
    parsePaths : function(argv){
        program.parse(argv);
        return {
            build : program.dest,
            src : {
                scripts : [program.src + "/**/*.js", "!" + program.dest + "/**/*.js"],
                images : [program.src + "/**/*.+(png|jpg|jpeg|gif)", "!" + program.dest + "/**/*.+(png|jpg|jpeg|gif)"],
                styles : [program.src + "/**/*.css", "!" + program.dest + "/**/*.css"]
            }
        }
    },
    warnLog : function(text){
        console.log(('----------- ' + text + ' -----------').yellow);
    },
    successLog : function(text){
        console.log(('----------- ' + text + ' -----------').green);
    }
};
var tasks = {
    _register : function(paths){
        var self = this;
        console.log(paths);
        gulp.task('clean', function(cb) {
            del([paths.build], cb);
        });
        gulp.task('scripts', function() {
            helpers.warnLog('开始压缩js');
            return gulp.src(paths.src.scripts)
                .pipe(uglify())
                .pipe(gulp.dest(paths.build))
                .on('end', function(){
                    //helpers.successLog('完成压缩js');
                });
        });
        gulp.task('images', function() {
            helpers.warnLog('开始压缩图片');
            return gulp.src(paths.src.images)
                .pipe(imagemin({optimizationLevel: 5}))
                .pipe(gulp.dest(paths.build))
                .on('end', function(){
                    //helpers.successLog('完成压缩图片');
                });
        });
        gulp.task('styles', function() {
            helpers.warnLog('开始压缩css');
            return gulp.src(paths.src.styles)
                .pipe(minifyCss())
                .pipe(gulp.dest(paths.build))
                .on('end', function(){
                    //helpers.successLog('完成压缩css');
                });
        });
        gulp.task('build', function(){
            runSequence('clean', ['scripts', 'images', 'styles'], function(){
                console.log('压缩完成共耗时：'.red + (Date.now() - self._startTime).toString().green + ' 毫秒'.red);
            });
        });
        return self;
    },
    _build : function(){
        var self = this;
        self._startTime = Date.now();
        gulp.start('build');
    },
    run : function(paths){
        var self = this;
        self._register(paths);
        self._build();
        return self;
    }
};

module.exports = {
    cli : function(argv){
        tasks.run(helpers.parsePaths(argv));
    }
};