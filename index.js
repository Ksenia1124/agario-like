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

app.get('/24', function(req, res) {
    res.sendFile(__dirname + '/Day24/index.html');
});

app.get('/25', function(req, res) {
    res.sendFile(__dirname + '/Day25/index.html');
});

app.get('/26', function(req, res) {
    res.sendFile(__dirname + '/Day26/index.html');
});

app.get('/28', function(req, res) {
    res.sendFile(__dirname + '/Day28/index.html');
});

app.get('/29', function(req, res) {
    res.sendFile(__dirname + '/Day29/index.html');
});

app.get('/try', function(req, res) {
    res.sendFile(__dirname + '/Day22/try.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

var users = {};
io.on('connection', function(client) {
  client.emit('users base', users);
  client.emit('user connected', client.id);
  client.on('user done', function(coordx, coordy, ID, color, size){
    users[client.id] = {
      x: coordx,
      y: coordy,
      Id: ID,
      color: color,
      size: size
    }
    io.sockets.emit('user done', coordx, coordy, ID, color, size)
    client.broadcast.emit('users move done', coordx, coordy, ID, color, size)
  });
  
  client.on('user dome', function(color, size, x, y){
    users[client.id] = {
      color: color,
      size: size,
      x: x,
      y: y
    }
   client.broadcast.emit('user dome', x, y, color, size, client.id)
  });
  
  
  client.on('move done', function(obj, ID){
    client.broadcast.emit('sprite changes coord', obj, users[ID].color, users[ID].size);
    client.broadcast.emit('sprite change coord',  ID,  obj);
    client.emit('move done', ID, obj);
    users[client.id].x =  obj.x;
    users[client.id].y =  obj.y;
  });
  
  client.on('disconnect', function(){
    client.broadcast.emit('user disconnected', client.id);
    delete users[client.id];
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
