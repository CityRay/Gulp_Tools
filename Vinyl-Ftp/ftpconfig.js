/*
* @Author: RayLin
* @Date:   2015-12-02 17:47:29
* @Last Modified by:   Ray Lin
* @Last Modified time: 2016-06-01 16:00:37
*/

// gutil.env.username
var gutil = require('gulp-util');

var config = function (user, pwd) {
    return {
        host:     '10.10.7.231',
        user:     user,
        password: pwd,
        parallel: 10,
        log: gutil.log
    }
};

module.exports = config;
