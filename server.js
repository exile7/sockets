var PORT = process.env.PORT || 8080;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);

		message.timestamp = moment().valueOf();
		// socket.broadcast sends it to everyone except the sender, io.emit sends to all
		io.emit('message', message);
	});

 	// message is whatever you want to call ur event and pass back object so u can store more stuff
	socket.emit('message', {
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log('Server started on PORT: ' + PORT);
});