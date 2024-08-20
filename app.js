const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
  

    console.log('user connected');
    console.log('Socket ID:', socket.id);


    socket.emit('socketId', socket.id);


    socket.on('user',user =>{ socket.name=user;});
    
    socket.on('username',formvalue=>
    {
        socket.broadcast.emit("update",formvalue);
    }
    );

    socket.on('exit',formvalue=>
        {
            
            socket.broadcast.emit("out",formvalue);
        }
        );



socket.on('clientmessage',(data,no) =>{
    var a=socket.name;
    console.log("message from client",a);
    console.log("number",no);
    if(no === "")
    {
        socket.broadcast.emit("recmessage",a,data);
        
    }
    else{  socket.to(no).emit("recmessage",data);  }

    socket.on("joingroup",(room)=>{
        socket.join(room);
        
    })

});

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000,() => {
    console.log('Server running on port 3000');
});


