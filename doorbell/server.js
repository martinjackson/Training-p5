
let express = require('express');
let socket = require('socket.io')
let rpio = require('rpio')

let app = express();
let host = 3000
let server = app.listen(host)

app.use(express.static('public'));

console.log("Socket server is running. localhost:" + host)

// ---------------------------------------- 
let light = 12;   // GPIO 18
rpio.open(light, rpio.OUTPUT, rpio.LOW);


// ---------------------------------------- 
let io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket) {
   console.log('connection:', socket.id);
   socket.on('mouse', mouseMsg);

   function mouseMsg(data) {
      // socket.broadcast.emit('mouse', data)

      rpio.write(light, rpio.HIGH)                
      console.log(data)
      rpio.write(light, rpio.LOW)                
   }
}


