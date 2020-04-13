import React from 'react';

function Comments(){
    const card={
        width:'100%',
        margin:'10px'
    }
    const  comment = {
        borderStyle:'groove',
        marginBotton:'5px',
        padding:'3px'
    }
    return(
        <div class="card" style={card}>
            <div class="card-body">
                <h5 class="card-title text-center">Comments</h5>
                
                <p style={comment}>Commented By Chris on your goal
                Good Job On Your Goals john</p>
                <p style={comment}>Commented By Chris on your goal
                Good Job On Your Goals john</p>
               
            </div>
        </div>
    );
}

export default Comments;