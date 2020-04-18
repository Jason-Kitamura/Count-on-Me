import React, { useState } from 'react';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialize the socketio --*/

function Comments(){
    const card={
        width:'100%',
        margin:'10px'
    }
    const  comment = {
        borderStyle:'groove',
        borderRadius:'5px',
        marginBotton:'5px',
        padding:'3px'
    }
    const styleForNotificationHead ={
        
        paddingLeft:'20px',
        paddingTop:'10px',
        paddingBottom:'0px',
        textAlign:'left'
    }
    

    const [chatcomment, setChatcomment] = useState("");

    /*-- m.p. post comment --*/
    socketio.on('whisp', function(data){
        console.log(`${data.msg} from ${data.fromUser} to ${data.toUser}`)
        setChatcomment(chatcomment + ` ${data.fromUser} : ${data.msg} <br/>`);
    });


    return(
        <div class="card" style={card}>
              <h5 class="card-title" style={styleForNotificationHead}><i class="fas fa-comment-alt"></i>   Notifications</h5>
            <div class="card-body">

                {/* <p style={comment}>Commented By Chris on your goal
                Good Job On Your Goals john</p> */}
               
                <p style={comment} dangerouslySetInnerHTML={{__html: chatcomment}}></p>

            </div>
        </div>
    );
}

export default Comments;