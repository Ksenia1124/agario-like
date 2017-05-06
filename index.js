var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/Day19/chat.html');
});

app.get('/input', function(req, res) {
    res.sendFile(__dirname + '/Day20/input.html');
});

app.get('/output', function(req, res) {
    res.sendFile(__dirname + '/Day20/output.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
