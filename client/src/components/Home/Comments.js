import React from 'react';

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
    return(
        <div class="card" style={card}>
              <h5 class="card-title" style={styleForNotificationHead}><i class="fas fa-comment-alt"></i>   Notifications</h5>
            <div class="card-body">
                <p style={comment}>Commented By Chris on your goal
                Good Job On Your Goals john</p>
                <p style={comment}>Commented By Chris on your goal
                Good Job On Your Goals john</p>
               
            </div>
        </div>
    );
}

export default Comments;