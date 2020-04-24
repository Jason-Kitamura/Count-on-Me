import React,{useState, useRef, useEffect, useContext} from "react";
import CoverPhoto from './CoverPhoto';
import UserOptions from './UserOptions';
import TodoLists from './TodoLists';
import Followers from './Followers';
import Following from './Following';
import GoalModal from '../Home/GoalModal';
import TaskModel from './TaskModel';

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
       display:'flex',
       justifyContent:'space-around',
       alignItems:'center'
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

   //Checking user login 
   const userEmail = JSON.parse(sessionStorage.getItem('userEmail'));
   if ( !userEmail ){
       console.log( 'logged out!' );
   } else {
       console.log( 'logged in!', userEmail );
   }


    const [ user, setUser ]= useState([]);
    const [ firstName, setUserFirstName ] = useState([]);
    const [ lastName, setUserLastName ] = useState([]);
   
    const followers = useRef(null);
    const following = useRef(null);



   useEffect( function(){
        getUser();
        console.log('use effect is called');
    }, [] );

   async function getUser(){
    console.log(`calling axios.get for email: `, userEmail)
    const user = await axios.get( `/api/userData/${userEmail.email}`);

    if( user.error ){
        console.log(`error getting from db`, user.error)
        return;
    }
    
    setUser( user );
    console.log( `Retrieved user data:`, user);
    console.log( `Retrieved user data:`, user.data.profilePic);
    let firstName = user.data.firstName;
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    setUserFirstName( firstName )
    let lastName = user.data.lastName;
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    setUserLastName( lastName )
    console.log(`User first:`, firstName , `user last`, lastName)
   }

   function executeScrollToFollowers(){
    console.log(`Calling scroll function`, followers)
    
    window.scrollTo(0, followers.current.offsetTop)  
   }

   function executeScrollToFollowing (){
    console.log(`Calling scroll function`, following)
    
    window.scrollTo(0, following.current.offsetTop)  
   }
   const [show, setShow] = useState(false);
   const [ showTask , setShowTask ] = useState( false );

   async function addGoal(){
        console.log('[Add New GOAL button pressed]',show)
        setShow(true);
    }
    async function closeGoal(){
        setShow(false);
    }
    function addTask(){
        console.log('you clicked add goal');
        setShowTask( true );
    }
    function closeTask(){
        setShowTask( false );
    }
    const name={
        marginRight:'5px'
    }


    return (
        <div style={scroll}>
         <div id="header" style={home}>
           <h4> <i class="fas fa-columns"></i> Dash Board</h4>
           <h4 style={name}>{firstName}  {lastName}</h4>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-md-8' style={columns}>
                <CoverPhoto />  
                   {/* <button class='btn btn-light' onClick={addGoal} style={selectOption}><i class="fas fa-plus"></i>   Add New Goal</button> */}
            </div>
            <div class='col-12 col-md-3'style={columns} >
            <UserOptions executeScrollToFollowers={executeScrollToFollowers} executeScrollToFollowing={executeScrollToFollowing}/>
            </div>
        </div>
        <div class='row' style={liveData}>
            <TodoLists setTask={addTask} setGoal={addGoal}/>
        </div>
        <div class='row' ref={followers} style={liveData}>
            <Followers />
        </div>
        <div class='row' ref={following} style={liveData}>
            <Following />
        </div>
        <GoalModal show={show} closeGoal={closeGoal}/>
        <TaskModel show={showTask} closeTask={closeTask}/>
    </div>
    );

   
}

export default HomePage;