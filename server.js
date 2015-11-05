var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);

		// send it to everyone except the sender
		socket.broadcast.emit('message', message);
	});

 	// message is whatever you want to call ur event and pass back object so u can store more stuff
	socket.emit('message', {
		text: 'Welcome to the chat application!'
	});
});

http.listen(PORT, function() {
	console.log('Server started on PORT: ' + PORT);
});