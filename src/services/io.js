import socketio from 'socket.io';
import log from './log';

const io = socketio();

io.on('connection', function(socket) {
    log.d('a user connected');
    
    socket.on('users.load', function() {
        log.d('>>> users.load');
        
        let users = [];
        
        users.push({ id: 1, name: 'Leonardo 1', email: 'lalkmim@gmail.com', admin: true });
        users.push({ id: 2, name: 'Leonardo 2', email: 'l.alkmim@gmail.com', admin: false });
        
        socket.emit('users.load.result', users);
    });
});

export default io;