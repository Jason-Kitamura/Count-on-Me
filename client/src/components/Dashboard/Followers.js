import React, {useEffect, useState} from 'react';
import FollowerCard from './FollowerCard.js'

const axios = require('axios');


function Followers() {
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

    const [followers, setFollowers] = useState([]);
    const [completed, setCompleted] = useState([]);



    async function getFollowersList( props ){
        const obj = {
            email : props 
        }
        //get info from server
        console.log(`Axios call for followers:`, obj)
        const allFollowers = await axios.post( 'http://localhost:5000/api/getUserFollowers', obj );
        console.log('Array of followers', allFollowers.data);
        setFollowers( allFollowers.data );
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

                    Followers

                    <div class="row d-flex justify-content-center mt-2">
                    {followers.map( follower=><FollowerCard id={follower} />)}
                   
                </div>

                </div>
            </div>
        </div>
    );
}

export default Followers;