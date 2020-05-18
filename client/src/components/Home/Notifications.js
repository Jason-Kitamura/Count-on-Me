import React, { useState, useEffect } from 'react';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialize the socketio --*/
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Notifications() {

    const card={
        width:'100%',
        margin:'10px',
        padding : '6%'
    }
    const styleForNotificationHead ={
        paddingLeft:'20px',
        paddingTop:'10px',
        paddingBottom:'0px',
        textAlign:'left'
    }
    const  commentStyle = {
        border : 'solid royalblue',
        borderRadius : '10px',
        color : 'royalblue',
        textAlign : 'left',
        display : 'block',
        margin : 'auto',
        marginLeft : '40px',
        marginBottom : '10px',
        fontSize : 'larger',
        width : 'fit-content',
        height : 'fit-content',
        padding : '4px 8px 4px 8px',
        boxShadow: '3px 5px 5px 1px #888888'
        }

    const [chatComment, setChatComment] = useState("");

    socketio.once('whisp', function(data){
        console.log(`${data.msg} from ${data.fromUser} to ${data.toUser}`);
        setChatComment(  ` ${data.fromUser} commented: ${data.msg} `);
    });
    
    useEffect( () => {
         if ( chatComment !== '' ){
            toast.info( chatComment , {
                autoClose : false
            });
         }
    },[chatComment])

    return(
        <div>
            {/* <div class="card" style={card}>
                <h5 class="card-title" style={styleForNotificationHead}><i class="fas fa-comment-alt"></i>   Notifications</h5>
                <div class="card-body">
                    <p style={commentStyle} dangerouslySetInnerHTML={{__html: chatcomment}}></p>
                </div>
            </div> */}
        </div>
    )
}
export default Notifications