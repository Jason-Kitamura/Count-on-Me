import React, {useEffect, useState} from 'react';
import FollowerCard from '../Dashboard/FollowerCard.js'
import { useParams } from 'react-router-dom';

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
    

    const [followings, setFollowing] = useState([]);
    const id = useParams();



    async function getFollowingList( ){
        const obj = {
            id : id 
        }
        //get info from server
        console.log(`Axios call for following:`, obj)
        const allFollowing = await axios.post( 'http://localhost:5000/api/getUserFollowingById', obj );
        console.log('Array of following', allFollowing.data);
        setFollowing( allFollowing.data );
        // console.log(`Followers set to `, followers)
    }

  useEffect( ()=>{

        getFollowingList( );

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