import React, { useState } from "react";
import Posts from './Posts';
import Goals from './Goals';
import Comments from './Comments';
import Notifications from './Notifications';
import GoalModal from './GoalModal';
import axios from 'axios';

function HomePage(){
    const [show,setShow] = useState(false);
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
       const home = {
       width:'100%',
       height:'70px',
       textAlign:'center',
       fontFamily: "'Noto Sans', sans-serif",
       color:'white',
       display:'flex',
       justifyContent:'space-around',
       alignItems:'center',
       backgroundColor:'rgb(230, 126, 34)'
       
   }
   const liveData = {
       flex:1,
       flexDirection:'row',
       padding:'10px',
       margin:'0px',
      
       
   }
   const columns = {
       padding:'0',
       margin:'4px 50px 0px 50px ',
       maxWidth : '700px',
   }
   const columns2 = {
    padding:'0',
    margin:'4px 10px 0px 10px',
    maxWidth : '400px',
    
}
   const newGoal = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
}
const name={
    marginRight:'5px'
}
async function addGoal(){
    console.log('[Add New GOAL button pressed]',show)
    setShow(true);
}
async function closeGoal(){
    setShow(false);
}
if(sessionStorage.getItem('userEmail') !== null){
    getProfilePic()
}
async function getProfilePic(){
const userFromSessionStorage = JSON.parse(sessionStorage.getItem('userEmail'));
console.log('[user mail id:]',userFromSessionStorage.email);
const user = await axios.get( `/api/userData/${userFromSessionStorage.email}`);
console.log(`[Profile picture Link ]`,user.data.profilePic)
let firstName = user.data.firstName;
firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
setFirstname(firstName);
let lastName = user.data.lastName;
lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
setLastname(lastName);
}
    return (
        <div>
        <div style={home}>
           <h4> <i class="fas fa-home"></i> Home</h4>
           <h4 style={name}>{firstname}  {lastname}</h4>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-sm-12 col-md-7' style={columns}>
                <Posts />
            </div>
            <div class='col-12 col-sm-12 col-md-4'style={columns2} >
                <Notifications/>
                <Goals setGoal={addGoal} />
                <Comments />
                <GoalModal show={show} closeGoal={closeGoal}/>
            </div>
        </div>
        
        </div>
    );

}

export default HomePage;