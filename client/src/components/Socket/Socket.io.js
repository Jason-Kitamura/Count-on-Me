import React, {useState} from "react";
import SocketIO  from "socket.io-client"; 

const socketio = SocketIO('http://localhost:4000/');

function Socket( props ){
    return (<> </>)
}

export {Socket, socketio};