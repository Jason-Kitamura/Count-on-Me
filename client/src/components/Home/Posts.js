import React, { useState, useEffect } from 'react';

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
        fontFamily: 'Pacifico',
        fontSize : 'x-large',
        textAlign: 'left',
        padding: "10px",
        margin: '0px'
    }
    const post = {
        display: 'flex',
        flexDirection: "row"
    }
    const cardBody = {
        padding: '5px'
    }

    const goalStyle = {
        border : 'solid  thin grey ',
        width : '80%',
        display : 'block',
        margin : 'auto',
        marginBottom : '5px',
        padding : '5px'
    }
    const goalTitleStyle = {
        // textAlign : 'left',
        fontWeight : 'bold',
        margin : '0px'
    }
    const goalDesStyle = {
        textAlign : 'left',
        margin : '0px',
        fontSize : 'small'
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
            borderRadius : '5px',
            fontSize:'15px',
            
        }
    }
    const commentStyle = {
        borderStyle : ' groove',
        borderRadius : '5px',
        textAlign : 'left',
        display : 'block',
        margin : 'auto',
        marginLeft : '10%',
        marginBottom : '10px',
        fontSize : 'smaller',
        width : 'fit-content',
        padding : '5px'
    }
    const commentNameStyle = {
        margin : '0px',
    }
    const commentBodyStyle = {
        margin : '0px',
        float : 'right',
        fontSize : 'small',
        paddingLeft : '5px',
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
        // try{
        //     socketio.emit('message-sent', {A:JSON.parse(sessionStorage.getItem('userEmail')), B: postEmail, T:comment}, function(data){

        //       console.log(`message sent : ${data}`);   

        //     });
        // } catch (err){ console.log("Error happened in posts component" + err) }
    }
    
    return (
        <div>
            {newsFeed.map( post => (
            
                    <div class="card" style={card}>
                        <div style={post}>
                            <h5 style={name}>{post.firstName}</h5>
                        </div>
                        <div style={cardBody}>
                            <div>
                                {post.goals.map( goal => (
                                    <div style={goalStyle}>
                                        <h6 style={goalTitleStyle}>{goal.title}</h6>
                                        <p style={goalDesStyle}>{goal.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div class="input-group mb-3" style={commentSection}>
                                <input style={commentSection.input} onChange={HandleOnComment}  value={comment} type="text" id='input' class="form-control no-border" placeholder="Add a comment..." aria-label="comment" aria-describedby="basic-addon2" />
                                <button style={commentSection.button} onClick={(e) => {postComment( e, post.email)}} class="btn" type="button">post</button>
                            </div>
                        </div>
                        <div style={cardBody}>
                            {post.comments.map( comment => (
                                <div style={commentStyle}>
                                    <h5 style={commentNameStyle}>{comment.name}<p style={commentBodyStyle}>{comment.body}</p></h5>
                                </div>
                            ))}
                        </div>
                    </div>
                 
            ))}
        </div> 
    );
}

export default Posts;