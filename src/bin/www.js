#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import Debug from 'debug';
import http from 'http';
import passport from 'passport';
import io from '../services/io';
import db, { loadModels } from '../services/db';
import { loadRoutes } from '../routes';
import log from '../services/log';
import passportConfig from '../services/passportConfig';

const debug = Debug('workspace:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/*
 * This guarantees that the exact same instance is shared to all calls
 */
app.set('io', io);
app.set('db', db);

/*
 * Load routes
 */
loadRoutes();

/*
 * Load sequelize defined models
 */
loadModels();

/*
 * Configure passport authentication
 */
passportConfig(passport);

/*
 * Attach socket.io to running server
 */
io.attach(server);

/*
 * Other
 */
log.i('Server ready to roll!');

const metadata = async function(db) {
    var tables = await db.query('SELECT * FROM sqlite_master',  { type: db.QueryTypes.SELECT });
    
    for(var i=0; i<tables.length; i++) {
        log.d(tables[i]);
        var table = await db.query('pragma table_info(:tableName);',  { replacements: { tableName: tables[i] }, type: db.QueryTypes.SELECT });
        log.d(table);
    }
};

/*
const baseInserts = async function(db) {
    var user = User.build({ name: 'Leonardo', login: 'lalkmim', email: 'lalkmim@gmail.com'});
    await user.save();
    
    var menuItem = MenuItem.build({ label: 'Home', link: '/'});
    await menuItem.save();
};
*/