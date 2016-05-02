var config = require('../config');
var MenuItem = require('../models/menu_item');

module.exports.controller = function(router) {
    router.get('/', function(req, res, next) {
        var area01Buttons = [{
            icon: 'fa-paper-plane',
            header: 'This Is Important',
            text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
        }, {
            icon: 'fa-pencil',
            header: 'Also Important',
            text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
        }, {
            icon: 'fa-wrench',
            header: 'Probably Important',
            text: 'Duis neque nisi, dapibus sed mattis et quis, nibh. Sed et dapibus nisl amet mattis, sed a rutrum accumsan sed. Suspendisse eu.'
        }];
        
        MenuItem.findAll().then(function(menuItems) {
            var params = { title: config.site.name, area01Buttons: area01Buttons, menuItems: menuItems };
            
            res.render('index', params);
        });
    });
};