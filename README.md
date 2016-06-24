# boiler-pes3

This is a boilerplate for a NodeJS web application using [Passport](http://passportjs.org), [ExpressJS](http://expressjs.com), [Socket.IO](http://socket.io), [Sass](http://sass-lang.com) and [Sequelize](http://sequelizejs.com) (PES3), using SQLite as database.

The design is based on [skeleton](http://getskeleton.com).

Working features and libraries:
+ Express
+ React
+ Sass
+ Sequelize
+ Winston logging + Papertrail viewer
+ Babel (ES6 + async/await ready)
+ Webpack

# On the roadmap
+ Use socket.io for communication
+ Change authentication to run without refresh
+ Passport authentication
    + Facebook
    + Google
    + Local (JWT + bcrypt)
    + Twitter
    + Github
+ Use [node-config](https://github.com/lorenwest/node-config) for environment configuration
+ Review buttons design ([link](http://buttonoptimizer.com/))
+ Script to automatically point to new repository ([link to stackoverflow](https://stackoverflow.com/questions/28401882/make-git-clone-its-own-repository/28402208#28402208))
+ Script to automatically deploy to dev and prod (docker + aws) ([link to post](https://www.airpair.com/docker/posts/the-painful-journey-of-painless-deployments))
+ Support for MySQL / MariaDB
+ Support for PostgreSQL