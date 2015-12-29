/*
* @Author: RayLin
* @Date:   2015-12-02 17:47:29
* @Last Modified by:   RayLin
* @Last Modified time: 2015-12-04 11:26:36
*/

var gutil = require('gulp-util');

var config = {
    host:     '*.*.*.*',
    user:     'username',
    password: 'password',
    parallel: 3,
    log: gutil.log
};

module.exports = config;
