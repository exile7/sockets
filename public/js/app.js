var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server');


});

socket.on('message', function(message) {
	console.log('New message: ' +message.text);

	$('.messages').append(message.text + '<hr />');
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function() {
	event.preventDefault();
	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	})
	
	$('#message').val('');
	$('#message').focus();
});