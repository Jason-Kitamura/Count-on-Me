import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Comments(){
    const card={
        width:'100%',
        margin:'10px',
        padding : '6%'
    }
    const commentTitle = {
        fontWeight : '500',
        marginBottom : '10px',
    }
    const  commentStyle = {
        borderStyle:'groove',
        borderRadius:'10px',
        marginBottom:'10px',
        marginLeft : '4%',
        padding:'4px',
        paddingLeft : '8px',
        paddingRight : '8px',
        width : 'fit-content',
        boxShadow: '5px 10px 15px #888888'
    
    }
    const commentNameStyle = {
        margin : '0px',
        textAlign:'left'
    }
    const commentBodyStyle = {
        margin : '0px',
        float : 'right',
        fontSize : 'small',
        paddingLeft : '5px',
    }
    const styleForNotificationHead ={
        
        paddingLeft:'20px',
        paddingTop:'10px',
        paddingBottom:'0px',
        textAlign:'left'
    }

    const [ userComments, setUserComments ] = useState([]);
    const [ Email, setEmail ]=useState('');

    async function getComments( userEmail ){
        const obj = {
            email : userEmail
        }
        const userData = await axios.post( '/api/getComments', obj);
        console.log('comments:', userData );
        setUserComments( userData.data )
    }

    useEffect( () => {
        const user = JSON.parse( sessionStorage.getItem('userEmail'));

        getComments( user.email )
    },[])
    return(
        <div style={card} class="card">
           
            <h5 style={commentTitle}>Comments</h5>
            {userComments.map( comment => (
                <div style={commentStyle}>
                    <h5 style={commentNameStyle}>{comment.name}<p style={commentBodyStyle}>{comment.body}</p></h5>
                </div>
            ))}
        </div>
    );
}

export default Comments;