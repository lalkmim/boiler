module.exports = {
    database: {
        folder: 'db',
        file: 'database.sqlite',
        name: 'database',
        login: null,
        password: null
    },
    site: {
        name: 'boiler-pes3',
        host: {
            dev: 'http://<dev_url>:<port>',
            c9: 'http://boiler-pes3-<user>.c9users.io',
            prod: ''
        }
    },
    passport: {
        clientID: 1507411012827539,
		clientSecret: 'bd1f55c384ba7f9940f2f9bdaf9a7d44',
		callbackURL: '/auth/facebook/callback'
    }
};