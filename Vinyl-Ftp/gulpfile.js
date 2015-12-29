/*
* @Author: RayLin
* @Date:   2015-12-02 17:44:10
* @Last Modified by:   RayLin
* @Last Modified time: 2015-12-23 18:15:06
*/

// INSTALL
// npm install -g gulp gulp-cli

var $         = require('gulp-load-plugins')();
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var sequence = require('run-sequence');
var ftp       = require('vinyl-ftp');
var ftpconfig = require('./ftpconfig');
var header    = require('gulp-header');


//Upload Files To Root Start=============================================================================
//ROOT
gulp.task('uploadToRoot', function(){
    process.stdout.write('Transfering Root files...\n');

    var conn = ftp.create(ftpconfig);

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

gulp.task('upload', function(cb) {
  sequence('uploadToRoot',
            'uploadToRootCSHTML',
            'message',
            cb);
});
