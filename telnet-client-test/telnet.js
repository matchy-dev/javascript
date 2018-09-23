const telnet = require('telnet-client');
const server = new telnet();

var rlif = null;

// display server response
server.on("data", function(data){
    console.log(''+data);
});

// login when connected
server.on("connect", function(){
    console.log("connected");
    rlif = require("readline").createInterface(process.stdin,process.stdout);
    rlif.on("line",function(str){
        server.send(str + "\n");
    });
});

server.on("close", function(data){
    process.exit();
});

var argv = process.argv;
if(argv.length<4){
    console.log("arg server port");
    process.exit();
}
var addr = argv[2];
var port = argv[3];

// connect to server
server.connect({
    host: addr,
    port: port
});
