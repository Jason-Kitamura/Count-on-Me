import React, {useState} from "react";
import SocketIO  from "socket.io-client"; 

const socketio = SocketIO(); // const socketio = SocketIO('http://localhost:5000');

function Socket( props ){
    return (<> </>)
}

export {Socket, socketio};