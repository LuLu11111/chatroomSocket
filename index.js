const server = require("http").Server();
const port = process.env.PORT || 10001;
//aaa

var io = require("socket.io")(server);

var usernames =[];
var msgs =[];
var allRooms ={};

io.on("connection", function(socket){
    console.log("User is connected");
     socket.on("joinroom", function(data){
        socket.emit("yourid", socket.id);
        socket.join(data);
        //io.emit("createimage", allusers);
        socket.myRoom =data;
        
        if(!allRooms[data]){
            allRooms[data] = [];
        }
        
        
        allRooms[data].push(socket.id);
        io.to(data).emit("createimage", allRooms[data]);
        
    
     console.log(data);
        
    });
    
    socket.on("mymove", function(data){
        socket.to(this.myRoom).emit("usermove", data); 
    });
    
    
    
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
           var index = allRooms[this.myRoom].indexOf(socket.id);
        allRooms[this.myRoom].splice(index, 1);
        io.to(this.myRoom).emit("createimage", allRooms[this.myRoom]);
    })
});


server.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
        return false;
    }
    console.log("Socket port is running");
});