var fs = require('fs');
var path = require('path');
var router = require('express').Router();

module.exports = router;

module.exports.loadRoutes = function() {
    fs.readdirSync(__dirname).forEach(function (file) {
        if(file.substr(-3) == '.js' && file !== 'index.js') {
            var fileName = path.join(__dirname, file);
            require(fileName).controller(router);
    	}
    });
};