var socket = io.connect('https://app4chat.herokuapp.com/');
//var socket = io.connect('http://localhost:4000');

var output = document.getElementById('output');
var handler = document.getElementById('handle');
var msg = document.getElementById('message');
var btn = document.getElementById('send');
var feed = document.getElementById('feed');
var chat = document.getElementById('chatspace');
var bar = document.getElementById('bar');
var info = document.getElementById('label');
var lg = document.getElementById('log'); 

btn.addEventListener('click',function(){
    socket.emit('chat',{
        handler : handler.value,
        message : msg.value
    });
    msg.value="";
    handler.style.backgroundColor='#00ff00';
});

socket.on('chat',function(data){
    feed.innerHTML="";
    if(data.handler !="" && data.message !=""){
        if(data.handler==handler.value){
            data.handler="You";
        }
        output.innerHTML += '<span id="bar"><strong>'+data.handler+'</strong> : '+data.message+'</span><br><br>';   
    }
});

msg.addEventListener('keypress',function(){
    socket.emit('typing',handler.value);
});
msg.addEventListener('keyup',function(){
    socket.emit('typing',handler.value);
});

socket.on('typing',function(data){
    if(data!=""){
        feed.innerHTML = '<p><em>'+data+' is typing...</em></p>';
    }
});

lg.addEventListener('click',function(){
        socket.emit('online',handler.value);
});

socket.on('online',function(data){
    info.innerHTML += '<br>' + data;
});