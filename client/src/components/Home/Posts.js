import React, { useState } from 'react';

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


    

    return (
        <div>
           
        </div>
    );
}

export default Posts;