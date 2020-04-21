import React, {useEffect, useState} from 'react';
import FollowerCard from './FollowerCard.js'

const axios = require('axios');

function Following() {
    const card={
        width:'100%',
        margin:'10px',
    }

    const cardsContainer = {
        flex:1,
        flexDirection:'row',
        padding:'10px',
        margin:'20px',
        marginTop: '45px',
        marginLeft: '0px'
        
    }

    const [followings, setFollowings] = useState([]);



    async function getFollowersList( props ){
        const obj = {
            email : props 
        }
        //get info from server
        console.log(`Axios call for following:`, obj)
        const allFollowing = await axios.post( 'http://localhost:5000/api/getUserFollowing', obj );
        console.log('Array of followers', allFollowing.data);
        setFollowings( allFollowing.data );
        // console.log(`Followers set to `, followers)
    }

  useEffect( ()=>{
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
    
        if ( !user.email ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', user.email );

         getFollowersList( user.email );
        }
    },[])


    
    return (
        <div class='row' style={cardsContainer}>    
            <div class="card col-12" style={card}>
                <div class="card-body">

                    Following

                    <div class="row d-flex justify-content-center mt-2">
                    {followings.map( following=><FollowerCard id={following} />)}
                   
                </div>

                </div>
            </div>
        </div>
    );
}

export default Following;