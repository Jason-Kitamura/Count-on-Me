import React from 'react';


function Goals(props) {
    const card={
        width:'fit-content',
        display : 'block',
        margin : 'auto',
        marginTop:'30px',
        boxShadow : '2px 2px 8px  #999999'
    }

    const selectOption = {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius : '5px'
    }
   
    return (
        
       
        <div class="card" style={card}>
            <div class="card-body">
                <button class='btn btn-primary' style={selectOption} onClick={props.executeScrollToFollowers}><i class="fas fa-users"></i>   Followers</button>
                <br></br>
                <button class='btn btn-primary' style={selectOption} onClick={props.executeScrollToFollowing}><i class="fas fa-users"></i>   Following</button>
            </div>
        </div>
        
    );
}

export default Goals;
