import React, { useState, useEffect } from 'react';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialization  --*/


import './posts.css';
import axios from 'axios';

function Posts() {
    const card = {
        width: '100%',
        margin: '10px'
    }
    const img = {
        border: "1px hidden #ddd",
        borderRadius: "50%",
        padding: "15px",
        width: '80px',
        display: 'block',

    }
    const name = {
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',
        fontWeight : 'bold',
        fontSize : 'x-large',
        textAlign: 'left',
        padding: "10px",
        margin: '0px',
        color : 'mediumBlue'
    }
    const post = {
        display: 'flex',
        flexDirection: "row"
    }
    const cardBody = {
        padding: '5px',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',

    }

    const goalStyle = {
        border : 'solid  thin grey ',
        width : '80%',
        display : 'block',
        margin : 'auto',
        marginBottom : '5px',
        padding : '4px',
        boxShadow: '3px 3px 5px  #666666',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',


    }
    const goalTitleStyle = {
        // textAlign : 'left',
        // fontWeight : 'bold',
        margin : '0px'
    }
    const goalDesStyle = {
        // textAlign : 'left',
        margin : '0px',
        fontSize : 'small',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',

    }
    const iconStyle = {
        float : 'left',
    }
    const commentSection = {
        marginBottom: '0px',
        bottom: '-20px',
        width: '100%',
        borderTop: '1px solid #BDBDBD',
        padding:'10px',
        button: {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            outline: 'none',
            color : 'mediumBlue',
            fontWeight : 'bold'
            
        },
        input: {
            borderRadius : '5px',
            fontSize:'15px',
            
        }
    }
    const commentStyle = {
        border : 'solid grey thin',
        borderRadius : '10px',
        textAlign : 'left',
        display : 'block',
        margin : 'auto',
        marginLeft : '10%',
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
        fontWeight : 'bold'

    }
    const commentBodyStyle = {
        margin : '0px',
        float : 'right',
        fontSize : 'small',
        padding : '0px 0px 0px 5px',
        color: 'black'

    }
    
    const [comment,setComment] = useState('');
    const [ newsFeed, setNewsFeed ]= useState([]);
    const [ Email, setEmail ]=useState('');

    async function getPosts( userEmail ){
        const obj = {
            email : userEmail
        }
        const posts = await axios.post('/api/getPosts', obj );
        console.log('front end receiving posts: ', posts)

        setNewsFeed( posts.data );
    }

    
    useEffect( () => {
        const user = JSON.parse( sessionStorage.getItem('userEmail'));

        setEmail( user.email)
        
        getPosts( user.email);

    },[])

    function HandleOnComment(e){
        const value =e.target.value;
        setComment(value);
    }
    async function postComment( e,  postEmail ){
        
        e.preventDefault();
        const obj = {
            email : Email,
            postEmail : postEmail,
            comment : comment
        }
        const sendComment = await axios.post( '/api/postComment', obj );
        const user = JSON.parse( sessionStorage.getItem('userEmail'));
        getPosts( user.email);

        setComment('')
        try{
            socketio.emit('message-sent', {A: Email, B: postEmail, T:comment}, function(data){

              console.log(`message sent : ${data}`);   

            });
        } catch (err){ console.log("Error happened in posts component" + err) }
    }
    function checkCompleted( status ){
        console.log( status );
        if ( status === true ){
            return ('fa fa-check')
        } else {
            return ('far fa-square')
        }
    }
    if ( newsFeed.length === 0 ){
        return (
            <div class="card" style={card}>
                <h3>You aren't following anyone yet.</h3>
            </div>
        )
    } else {
        return (
            <div>
                {newsFeed.map( post => (
                
                    <div class="card" style={card}>
                        <div style={post}>
                            <h5 style={name}>{post.firstName}</h5>
                        </div>
                        <div style={cardBody}>
                            <h4 style={{ fontWeight : 'bold' }}>Goals</h4>
                            <div>
                                {post.goals.map( goal => (
                                    <div style={goalStyle}>
                                        <h6 style={goalTitleStyle}><i className={checkCompleted(goal.completed)} style={iconStyle}></i>{goal.title}</h6>
                                        <p style={goalDesStyle}>{goal.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div class="input-group mb-3" style={commentSection}>
                                <input style={commentSection.input} onChange={HandleOnComment}  value={comment} type="text" id='input' class="form-control no-border" placeholder="Add a comment..." aria-label="comment" aria-describedby="basic-addon2" />
                                <button style={commentSection.button} onClick={(e) => {postComment( e, post.email)}} class="btn" type="button">post</button>
                            </div>
                            <div class='card' style={cardBody}>
                                <h5>Comments</h5>
                                <hr/>
                                {post.comments.map( comment => (
                                    <div style={commentStyle}>
                                        <h5 style={commentNameStyle}>{comment.name}<p style={commentBodyStyle}>{comment.body}</p></h5>
                                    </div>
                                ))}
                            </div>
                        </div> 
                    </div>
                    
                
                ))}
            </div> 
        );
    }  
}

export default Posts;