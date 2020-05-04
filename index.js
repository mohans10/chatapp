var PORT = process.env.PORT || 4000;
var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(PORT,function(){
    console.log('Server is running at 4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
    console.log('Connection made : '+socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });

    socket.on('online',function(data){
        io.sockets.emit('online',data);
    });
});