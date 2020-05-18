import React,{useState, useRef, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import CoverPhoto from './CoverPhoto';
import UserOptions from './UserOptions';
import TodoLists from './TodoLists';
import FollowerCard from '../Dashboard/FollowerCard';

import "./style.css";

const axios = require('axios');

function HomePage(){
   const home = {
       width:'100%',
       height:'50px',
       textAlign:'center',
       backgroundColor:'rgb(230, 126, 34)',
       color:'white',
       fontFamily: "'Noto Sans', sans-serif",
       borderStyle:'groove', 
       paddingTop: '5px',
       marginBottom : '0'
   }
   const liveData = {
       flex:1,
       flexDirection:'row',
       padding:'0px',
       margin:'0px',
   }
   const columns = {
       padding:'0',
       margin:'4px'
   }
   const selectOption = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
    }
    const scroll = {
        scrollBehavior: 'smooth'
    }
    const card={
        width:'100%',
        margin:'10px',
        boxShadow : '2px 2px 8px  #999999',
    }

    const cardsContainer = {
        flex:1,
        flexDirection:'row',
        padding:'10px',
        margin:'20px',
        marginTop: '45px',
        marginLeft: '0px',
    }

    let  idParam  = useParams();
    // console.log(`Displaying user with id...`, { id })


    const [ user, setUser ]= useState([]);
    const [ firstName, setUserFirstName ] = useState([]);
    const [ lastName, setUserLastName ] = useState([]);
    const [ email, setUserEmail ] = useState([]);
    const [ profilePic, setProfilePic ] = useState('');
    const followersScroll = useRef(null);
    const following = useRef(null);

   useEffect( function(){
        getUser();
        // console.log('use effect is called');
    }, [] );

   async function getUser(props){

    let id; 

    if(props){
        id = props.id;
    }else{
        id = idParam;
    }
 
    console.log(`calling axios.get for id: `, id)
    const user = await axios.get( `/api/friend/${id.id}`);

    if( user.error ){
        console.log(`error getting from db`, user.error)
        return;
    }
    
    let email = user.data.email;
    setUserEmail( email )
    console.log(`User email:`, email)
    setUser( user );
    console.log( `Retrieved user data:`, user);
    let firstName = user.data.firstName;
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    setUserFirstName( firstName )
    let lastName = user.data.lastName;
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    setUserLastName( lastName )
    console.log(`User first:`, firstName , `user last`, lastName)
    setProfilePic(user.data.profilePic);

   }

   function executeScrollToFollowers(){
    console.log(`Calling scroll function`, followersScroll)
    
    window.scrollTo(0, followersScroll.current.offsetTop)  
   }

   function executeScrollToFollowing (){
    console.log(`Calling scroll function`, following)
    
    window.scrollTo(0, following.current.offsetTop)  
   }

   const [followers, setFollowers] = useState([]);
   const [followings, setFollowing] = useState([]);



   async function getFollowersList( ){
       const obj = {
           id : idParam
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

   async function getFollowingList( ){
    const obj = {
        id : idParam
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


   function refresh(){
       console.log(`Calling for page refresh`)
       getUser();
       getFollowersList();
       getFollowingList();
    //    console.log(`window location:`, window.location)
    //    window.location.pathname=`/user/${id}`

        window.scrollTo(0, 0) 

   }

   useEffect( function(){
    refresh();
    // console.log('use effect is called');
}, [idParam] );


  

    return (
        <div style={scroll}>
        <div id="header">
            <h3  style={home}>{firstName} {lastName}</h3>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-md-9' style={columns}>
                <CoverPhoto profilePic={profilePic}/>   
            </div>
            <div class='col-12 col-md-2'style={columns} >
                <UserOptions executeScrollToFollowers={executeScrollToFollowers} executeScrollToFollowing={executeScrollToFollowing}/>
            </div>
        </div>
        <div class='row' style={liveData}>
            <TodoLists email={email}/>
        </div>
        <div class='row' ref={followersScroll} style={liveData}>
            <div class='row' style={cardsContainer}>    
                <div class="card col-12" style={card}>
                    <div class="card-body">

                        Followers

                        <div class="row d-flex justify-content-center mt-2">
                        {followers.map( follower=><FollowerCard refresh={refresh} id={follower} />)}
                    
                    </div>

                    </div>
                </div>
            </div>
        </div>
        <div class='row' ref={following} style={liveData}>
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
        </div>
       
    </div>
    );

   
}

export default HomePage;