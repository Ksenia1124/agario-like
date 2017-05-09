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

app.get('/ui', function(req, res) {
    res.sendFile(__dirname + '/Day21/ui.html');
});

app.get('/22', function(req, res) {
    res.sendFile(__dirname + '/Day22/index.html');
});

app.get('/23', function(req, res) {
    res.sendFile(__dirname + '/Day23/index.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

var users = {};
io.on('connection', function(client) {
  client.emit('users base', users);
  client.emit('user connected', client.id);
  client.on('user done', function(coordx, coordy){
    users[client.id] = {
      x: coordx,
      y: coordy
    }
    client.broadcast.emit('user done', coordx, coordy, client.id)
  });
 
  client.on('button clicked', function(value){
    client.broadcast.emit('sprite change coord', client.id, value);
    client.emit('button clicked', client.id, value);
    users[client.id].x = +users[client.id].x + value
  });
  client.on('disconnect', function(){
    client.broadcast.emit('user disconnected', client.id);
    delete users[client.id];
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
