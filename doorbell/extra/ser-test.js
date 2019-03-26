const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;
const { PassThrough } = require('stream')
const split2 = require('split2')

var cfg = {
   portId: '/dev/ttyACM0',
   baudRate: 115200,
   dataBits: 8,
   stopBits: 1,
   parity: Serial.PARITY_NONE
   }

function hex2bin(hexStr) {
   let val =  parseInt(hexStr, 16).toString(2)
   if (val != 'NaN')
      val = val.padStart(32,'0');    // assumes alway a 4 digit hexadecimal => 32 bits
   return val
}

/*
0000047744 0030 0100
0000047746 0000 0000
*/

let count = 0;

function formatLine(s) {
      var words = s.split(" ");
      var patX = hex2bin(words[1]);
      var patY = hex2bin(words[2]);
      var i;

      var x = []
      for (i=0; i<patX.length; i++) {
         if (patX[i] == '1')
            x.push(patX.length-i)
      } 
         
      var y = []
      for (i=0; i<patY.length; i++) {
         if (patY[i] == '1')
            y.push(patY.length-i)
      } 

      if (x.length > 0 && y.length >0) {
         count++         

      process.stdout.write(" RAW: "+s+" X: ["+x+"] Y: ["+y+"] "+count+"\n");
      }
}


const pass = new PassThrough();

pass.pipe(split2()).on('data', formatLine);

 
raspi.init(() => {
  var serial = new Serial(cfg);
  serial.open(() => {
    serial.on('data', (chuck) => {
      pass.write(chuck);     // won't alway get a full string with new line
    });
  });
});


