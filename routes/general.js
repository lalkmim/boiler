module.exports.controller = function(router) {
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
};