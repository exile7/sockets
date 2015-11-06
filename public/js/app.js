var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server');


});

socket.on('message', function(message) {
	console.log('New message: ' +message.text);
	var timestampMoment = moment.utc(message.timestamp);
	$('.messages').append(message.text + '<br />'+ timestampMoment.local().format('hh:mm a') +'<hr />');
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function() {
	event.preventDefault();

	var now = moment();

	socket.emit('message', {
		text: $form.find('input[name=message]').val(),
		timestamp: now.valueOf()
	})
	
	$('#message').val('');
	$('#message').focus();
});