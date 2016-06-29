import passport from 'passport';
import log from '../services/log';

export function controller(router) {
    router.get('/error', function(req, res, next) {
        res.render('error');
    });
    
    /*
    router.get('/login', async function(req, res, next) {
        let menuItems = await MenuItem.findAll();
        var params = { title: config.site.name, menuItems: menuItems };
        res.render('login', params);
    });
    
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    */
    
    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect : '/error' }),
        function(req, res) {
            log.d('res.redirect', { user: req.user });
            res.redirect('/');
        });
        
    router.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

    router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect : '/error' }),
        function(req, res) {
            log.d('res.redirect', { user: req.user });
            try {
                res.redirect('/');
            } catch(err) {
                log.e(err);
            }
        });
    
    router.get('*', function(req, res, next) {
        res.render('index');
    });
}