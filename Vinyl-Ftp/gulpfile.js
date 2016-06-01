/*
* @Author: RayLin
* @Date:   2015-12-02 17:44:10
* @Last Modified by:   Ray Lin
* @Last Modified time: 2016-06-01 16:01:55
*/

// INSTALL
// npm install -g gulp gulp-cli

var $         = require('gulp-load-plugins')();
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var sequence  = require('run-sequence');
var ftp       = require('vinyl-ftp');
var ftpconfig = require('./ftpconfig');
var header    = require('gulp-header');
var prompt    = require('prompt');

var user      = '';
var pwd       = '';


//Upload Files To Root Start=============================================================================
//ROOT
gulp.task('uploadToRoot', function(){
    // process.stdout.write('Transfering Root files...\n');

    if(!user && !pwd) return 0;

    var conn = ftp.create(ftpconfig(user, pwd));


    var globs = [
      './Root/Content/**/*.+(css|png|gif|jpg|svg|eot|woff|woff2)',
      './Root/fonts/**/*.+(svg|eot|woff|woff2)',
      './Root/images/**/*.+(jpg|png|gif|svg)',
      './Root/Scripts/**/*.js'
    ];

    return gulp.src(globs, {base: './Root', buffer: false})
    .pipe(conn.newer('/Web/Root/'))
    .pipe(conn.dest('/Web/Root/'));

    //process.stdout.write('Transfer Root complete...\n');
});
gulp.task('uploadToRootCSHTML', function(){
    process.stdout.write('Transfering Root files...\n');

    var conn = ftp.create(ftpconfig);

    var globs = [
        './Root/Views/**/*.cshtml',
        '!./Root/Views/**/_GaAlpha.cshtml'
    ];

    return gulp.src(globs, {base: './Root', buffer: true})
    .pipe(conn.newer('/Web/Root/'))
    .pipe(header('\ufeff'))
    .pipe(conn.dest('/Web/Root/'));

    //process.stdout.write('Transfer Root complete...\n');
});
//Upload Files To Root End===============================================================================

gulp.task('message', function(){
    return gulp.src('./package.json').pipe($.notify("Upload Files Task Completed!"));
});

gulp.task('getInfo', function(cb){
    prompt.start();

    prompt.get([{name: 'username', required: true},
        {name: 'password', hidden: true, replace: '*', required: true}],
        function (err, result) {
            if(err) return 0;

            user = result.username;
            pwd = result.password;

            if(user && pwd){
                cb();
            }else{
                return 0;
            }

        });
});

gulp.task('upload', function(cb) {
  sequence('getInfo',
            'uploadToRoot',
            'uploadToRootCSHTML',
            'message',
            cb);
});
