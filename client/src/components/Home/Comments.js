import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialize the socketio --*/

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
        border : 'solid grey thin',
        borderRadius : '10px',
        textAlign : 'left',
        display : 'block',
        margin : 'auto',
        marginLeft : '40px',
        marginBottom : '10px',
        fontSize : 'smaller',
        width : 'fit-content',
        height : 'fit-content',
        padding : '4px 8px 4px 8px',
        boxShadow: '3px 5px 5px 1px #888888'
        }
    const commentNameStyle = {
        margin : '0px',
        color: 'mediumBlue',
        fontSize : '15px',
        fontWeight : 'bold',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',

    }
    const commentBodyStyle = {

        margin : '0px',
        fontSize : 'small',
        padding : '0px 0px 0px 5px',
        color: 'black'

    }
    const styleForNotificationHead ={
        
        paddingLeft:'20px',
        paddingTop:'10px',
        paddingBottom:'0px',
        textAlign:'left'
    }
    const commentImage = {
        borderRadius : '50%',
        width : "30px",
        height : '30px',
        marginRight : '10px',
        float : 'left'
    }
    

    const [ userComments, setUserComments ] = useState([]);
    const [ Email, setEmail ]=useState('');
    const [chatcomment, setChatcomment] = useState("");

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
    function getImage( pic ){
        if ( !pic || pic === ''){
            return ( 'https://www.booksie.com/files/profiles/22/mr-anonymous.png')
        } else {
            return ( pic )
        }
    }

    
    /*-- m.p. post comment --*/
    socketio.on('whisp', function(data){
        console.log(`${data.msg} from ${data.fromUser} to ${data.toUser}`)
        setChatcomment(chatcomment + ` ${data.fromUser} : ${data.msg} <br/>`);
    });

    return(
        <div>

            <div class="card" style={card}>
                <h5 class="card-title" style={styleForNotificationHead}><i class="fas fa-comment-alt"></i>   Notifications</h5>
                <div class="card-body">
                    <p style={commentStyle} dangerouslySetInnerHTML={{__html: chatcomment}}></p>
                </div>
            </div>
        
            <div style={card} class="card">
                <h5 style={commentTitle}>Comments</h5>
                {userComments.map( comment => (
                    <div>
                        <h5>
                            <img style={commentImage} src={getImage(comment.profilePic)}/>
                            <div style={commentStyle}>
                                <h5 style={commentNameStyle}>{comment.name}<p style={commentBodyStyle}>{comment.body}</p></h5>
                            </div>
                        </h5>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;