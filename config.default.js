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
        clientID: 0000000000000000,
		clientSecret: '00000000000000000000000000000000',
		callbackURL: '/auth/facebook/callback'
    }
};