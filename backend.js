var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));

app.get('/', function (request, response) {
  response.render('index.hbs');
});

io.on('connection', function (client) {
  console.log('Connected', client.id);
  
  client.on('disconnect', function () {
    console.log('EXITED', client.id);
  });
  
  client.on('draw-line', function (msg) {
    console.log(msg);
    io.emit('line-broadcast', msg);
  });
});

io.on('connection', function(socket){
  console.log('connected', new Date());
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
  	console.log('disconnected');
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});