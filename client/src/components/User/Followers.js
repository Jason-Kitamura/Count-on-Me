import React, {useEffect, useState, useRef} from 'react';
import FollowerCard from '../Dashboard/FollowerCard.js'
import { useParams } from 'react-router-dom';

const axios = require('axios');


function Followers(props) {

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
    const id = useParams();



    async function getFollowersList( ){
        const obj = {
            id : id 
        }
        //get info from server
        console.log(`Axios call for followers:`, obj)
        const allFollowers = await axios.post( 'http://localhost:5000/api/getUserFollowersById', obj );
        console.log('Array of followers', allFollowers.data);
        setFollowers( allFollowers.data );
        // console.log(`Followers set to `, followers)
    }

  useEffect( ()=>{

        getFollowersList( );

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