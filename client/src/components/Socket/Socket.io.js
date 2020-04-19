import React, {useState} from "react";
import SocketIO  from "socket.io-client"; 

// const socketio = SocketIO('http://localhost:5001/');
const PORT = process.env.PORT || 5000;
const socketio = SocketIO(`http://localhost:${PORT+1}`);


function Socket( props ){
    return (<> </>)
}

export {Socket, socketio};