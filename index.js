const server = require("http").Server();
const port = 10001;

var io = require("socket.io")(server);
var usernames =[];
var msgs =[];
io.on("connection", function(socket){
    console.log("User is connected");
    
    socket.on("username",function(data){
        console.log("user is giving a username:" + data);
        usernames.push(data);
        
        io.emit("usersJoined",usernames);
        
    })
    socket.on("sendChat",function(data){
        console.log("user send msg");
        msgs.push(data);
        io.emit("mdsgent", msgs);
        
    })
    
    socket.on("disconnect",function(){
        console.log("user has disconnected");
    })
});

server.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
        return false;
    }
    console.log("Socket port is running");
});