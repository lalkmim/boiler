import socketio from 'socket.io';
import log from './log';
import sharedSession from 'express-socket.io-session';
import app from '../app';

const io = socketio();

io.use(sharedSession(app.get('expressSession')));

io.on('connection', function(socket) {
    log.d('a user connected');
    
    socket.on('users.load', function() {
        log.d('>>> users.load');
        
        let users = [];
        
        users.push({ id: 1, name: 'Leonardo 1', email: 'lalkmim@gmail.com', admin: true });
        users.push({ id: 2, name: 'Leonardo 2', email: 'l.alkmim@gmail.com', admin: false });
        
        socket.emit('users.load.result', users);
    });
    
    socket.on('me.load', async function(params) {
        log.d('>>> me.load');
        const User = require('../models/user').default;
        let user = null;
        
        try {
            if(params && params.logout) {
                delete socket.handshake.session.passport;
            } else if(socket.handshake.session && socket.handshake.session.passport) {
                user = await User.findOne({ where: { id: socket.handshake.session.passport.user } });
                if(user) {
                    user = user.get();
                    delete user.password;
                }
            }
        } catch(err) {
            log.e(err);
        }
        
        log.d('user', { user: user });
        socket.emit('me.load.result', user);
    });
});

export default io;