var config = require('../config');
var MenuItem = require('../models/menu_item');
var passport = require('passport');
var log = require('../services/log');

module.exports.controller = function(router) {
    var baseParams = { title: config.site.name };
    
    router.get('/', async function(req, res, next) {
        log.d('router.get /');
        
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
        
        var params = baseParams;
        params.area01Buttons = area01Buttons;
        params.menuItems = req.menuItems;
        params.user = req.user;
        
        if(!params.menuItems) {
            let menuItems = await MenuItem.findAll();
            
            req.menuItems = menuItems;
            params.menuItems = menuItems;
            
            res.render('index', params);
        } else {
            res.render('index', params);
        }
    });
    
    router.get('/error', function(req, res, next) {
        res.render('error');
    });
    
    router.get('/login', async function(req, res, next) {
        let menuItems = await MenuItem.findAll();
        var params = { title: config.site.name, menuItems: menuItems };
        res.render('login', params);
    });
    
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect : '/error' }),
        function(req, res) {
            log.d('res.redirect');
            res.redirect('/');
        });
        
    router.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

    router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect : '/error' }),
        function(req, res) {
            log.d('res.redirect');
            res.redirect('/');
        });
};