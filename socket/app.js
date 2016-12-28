var io = require('socket.io')(3000);
var namespace = io.of('/networked-poker');

namespace.on('connection', function(socket) {
   console.log("Connection has been made");
});
