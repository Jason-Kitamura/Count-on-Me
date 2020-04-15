import React, {useRef} from 'react';
 
    // General scroll to element function

function Goals(props) {
    const card={
        width:'100%',
        margin:'10px',
        marginTop: '30px'
    }

    const selectOption = {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    }

    
    return (
        <div class="card" style={card}>
            <div class="card-body">
                <button class='btn btn-light' style={selectOption}><i class="fas fa-plus"></i>   Add New Goal</button>
                <br></br>
                <button class='btn btn-light' style={selectOption} onClick={props.executeScrollToFollowers}><i class="fas fa-users"></i>   Followers</button>
                <br></br>
                <button class='btn btn-light' style={selectOption} onClick={props.executeScrollToFollowing}><i class="fas fa-users"></i>   Following</button>
            </div>
        </div>
    );
}

export default Goals;
