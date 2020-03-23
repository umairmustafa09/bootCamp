const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dotenv = require('dotenv');

dotenv.config();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.emit('some event', {
	someProperty: 'some value',
	otherProperty: 'other value'
}); // This will emit the event to all connected sockets

io.on('connection', function(socket) {
	// console.log('user id', socket.id);
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function() {
		// console.log('user disconnected');
	});
	socket.on('chat message', function(msg) {
		// console.log('message: ' + msg);
	});
});

const port = process.env.PORT || 3000;

http.listen(port, function() {
	console.log(`server is listingin on ${port}`);
});
