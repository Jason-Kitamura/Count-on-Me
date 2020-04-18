import React, { useState, useEffect, useReducer } from 'react';
import './posts.css';
const axios = require('axios');

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
        fontFamily: 'Pacifico',
        textAlign: 'center',
        padding: "15px",
        paddingTop: '25px',
        margin: '0px',
    }
    const post = {
        display: 'flex',
        flexDirection: "row",
        textAlign : 'left',
        padding : '15px'
    }
    const cardBody = {
        padding: '5px'
    }
    const goalStyle = {
        padding: '5px',
        width : '80%',
        border : 'solid grey',
        display : 'auto',
        margin : 'auto',
        marginBottom : '5px'
    }
    const commentStyle = {
        padding: '5px',
        borderStyle:'groove',
        borderRadius:'5px',
        textAlign : 'left',
        margin : '10px'
    }
    const commentSection = {
        marginBottom: '0px',
        bottom: '-20px',
        width: '100%',
        borderTop: '1px solid #BDBDBD',
        padding:'10px',
        button: {
            fontFamily: 'Pacifico',
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
            outline: 'none',
            
        },
        input: {
            border: 'none',
            fontSize:'15px',
            
        }
    }
    const  [comment, setComment ] = useState('');
    const  [ newsFeed, setNewsFeed ]= useState([]);
    const [ user, setUser ]= useState('')

    function HandleOnComment(e){
        const value =e.target.value;
        console.log('comment', value)
        setComment(value);
    }
   async function addComment( postEmail ){
        const obj = {
            email : user,
            postEmail : postEmail,
            comment : comment,
        }
        console.log( 'creating comment ', obj );
        const postComment = await axios.post( '/api/postComment', obj );
        console.log('postComment', postComment );
    }
 
    async function getPosts( userEmail ){
        console.log('looking for posts for', userEmail );
        const obj = {
            email : userEmail
        }
        const posts = await axios.post('/api/getPosts', obj );
        const followees = posts.data
        console.log('received posts:', followees );

        setNewsFeed( followees );

    }
    useEffect( () => {
        const user = JSON.parse(localStorage.getItem('userEmail'));
        const userEmail = user.email;
        setUser( userEmail );

        getPosts( userEmail );
    },[])
    return (
        <div>
            {newsFeed.map( post => (
               <div class="card" style={card}>
                    <div style={post}>
                        <h5 style={name}>{post.firstName}</h5>
                    </div>
                    <div style={cardBody}>
                        {post.goals.map( goal => (
                            <div style={goalStyle}>{goal.title}</div>
                        ))}
                        {post.comments.map( comment => (
                               <div style={commentStyle}>
                                   <h4>{comment.name}</h4>
                                   <p>{comment.body}</p>
                               </div>
                            ))}
                
                        <div class="input-group mb-3" style={commentSection}>
                            <input style={commentSection.input} onChange={HandleOnComment} type="text" class="form-control no-border" id='input' placeholder="Add a comment..." aria-label="comment" aria-describedby="basic-addon2" />
                            <button style={commentSection.button} onClick={e => {addComment( post.email )}} class="btn" type="button">post</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts;