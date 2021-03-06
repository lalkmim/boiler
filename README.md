# boiler-pes3

This is a boilerplate for a NodeJS web application using [Passport](http://passportjs.org), [ExpressJS](http://expressjs.com), [Socket.IO](http://socket.io), [Sass](http://sass-lang.com) and [Sequelize](http://sequelizejs.com) (PES3), using SQLite as database.

The design is based on [skeleton](http://getskeleton.com).

Working features and libraries:
+ Passport
    + Facebook
    + Google
+ Express
+ Sass
+ Sequelize
+ Socket.IO
+ React + Redux + redux-act + PropTypes
+ Babel (ES6 + async/await + spread)
+ Webpack
+ Winston logging + Papertrail viewer
+ ESLint
+ Components
    + Modal for flash messages

# Roadmap
+ Immutable
+ Config Webpack for smaller bundles
+ Authorized socket.io
+ Change authentication to run without refresh
+ Passport authentication (JWT)
    + Local (bcrypt)
    + Twitter
    + Github
+ Use [node-config](https://github.com/lorenwest/node-config) for environment configuration
+ Review buttons design ([link](http://buttonoptimizer.com/))
+ Script to automatically point to new repository ([link to stackoverflow](https://stackoverflow.com/questions/28401882/make-git-clone-its-own-repository/28402208#28402208))
+ Script to automatically deploy to dev and prod (docker + aws) ([link to post](https://www.airpair.com/docker/posts/the-painful-journey-of-painless-deployments))
+ Support for MySQL / MariaDB
+ Support for PostgreSQL