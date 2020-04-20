import React,{useState, useRef, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import CoverPhoto from './CoverPhoto';
import UserOptions from './UserOptions';
import TodoLists from './TodoLists';
import Followers from './Followers';
import Following from './Following';

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
       paddingTop: '5px'
   }
   const liveData = {
       flex:1,
       flexDirection:'row',
       padding:'10px',
       margin:'0px'
       
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

    const  id  = useParams();
    console.log(`Displaying user with id...`, { id })


    const [ user, setUser ]= useState([]);
    const [ firstName, setUserFirstName ] = useState([]);
    const [ lastName, setUserLastName ] = useState([]);
    const [ email, setUserEmail ] = useState([]);
    const followers = useRef(null);
    const following = useRef(null);


   useEffect( function(){
        getUser();
        console.log('use effect is called');
    }, [] );

   async function getUser(){
    console.log(`calling axios.get for id: `, id)
    const user = await axios.get( `/api/friend/${id.id}`);

    if( user.error ){
        console.log(`error getting from db`, user.error)
        return;
    }
    
    setUser( user );
    console.log( `Retrieved user data:`, user);
    let firstName = user.data.firstName;
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    setUserFirstName( firstName )
    let lastName = user.data.lastName;
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    setUserLastName( lastName )
    console.log(`User first:`, firstName , `user last`, lastName)
    let email = user.data.email;
    setUserEmail( email )
    console.log(`User email:`, email)
   }

   function executeScrollToFollowers(){
    console.log(`Calling scroll function`, followers)
    
    window.scrollTo(0, followers.current.offsetTop)  
   }

   function executeScrollToFollowing (){
    console.log(`Calling scroll function`, following)
    
    window.scrollTo(0, following.current.offsetTop)  
   }
  

    return (
        <div style={scroll}>
        <div id="header">
            <h3  style={home}>{firstName} {lastName}</h3>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-md-8' style={columns}>
                <CoverPhoto />   
            </div>
            <div class='col-12 col-md-3'style={columns} >
            <UserOptions executeScrollToFollowers={executeScrollToFollowers} executeScrollToFollowing={executeScrollToFollowing}/>
            </div>
        </div>
        <div class='row' style={liveData}>
            <TodoLists email={email}/>
        </div>
        <div class='row' ref={followers} style={liveData}>
            <Followers />
        </div>
        <div class='row' ref={following} style={liveData}>
            <Following />
        </div>
       
    </div>
    );

   
}

export default HomePage;