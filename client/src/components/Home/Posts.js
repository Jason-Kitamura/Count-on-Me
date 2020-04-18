import React, { useState } from 'react';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialization  --*/


import './posts.css';
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
        margin: '0px'
    }
    const post = {
        display: 'flex',
        flexDirection: "row"
    }
    const cardBody = {
        padding: '5px'
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
    const [comment,setComment] = useState('');

    function HandleOnComment(e){
        const value =e.target.value;
        setComment(value);
    }

    /*-- m.p. post comment --*/
    function postComment(e){
        e.preventDefault();
        setComment('');
        try{
            socketio.emit('message-sent', {A:JSON.parse(sessionStorage.getItem('userEmail')), B:'testuser@testdomain.com', T:comment}, function(data){
                console.log(`message sent : ${data}`);    
            });
        } catch (err){ console.log("Error happened in posts component" + err) }
    }
    // function postComment(){
    //     console.log(comment);
    //     setComment('');
    // }
    

    return (
        <div>
            <div class="card" style={card}>
                <div style={post}>
                    <img style={img} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.flt4Xq9M4mMny9LVm2SwWgHaHa%26pid%3DApi&f=1" class="card-img-top" alt="..." />
                    <h5 style={name}>John</h5>
                </div>
                <div style={cardBody}>
                    <p class="font-weight-normal">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div class="input-group mb-3" style={commentSection}>
                        <input style={commentSection.input} onChange={HandleOnComment} value={comment} type="text" id='input' class="form-control no-border" placeholder="Add a comment..." aria-label="comment" aria-describedby="basic-addon2" />
                        <button style={commentSection.button} onClick={postComment} clickFocus={false} class="btn" type="button">post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;