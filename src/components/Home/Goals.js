import React, {useEffect, useState} from 'react';
const axios = require('axios');


function Goals() {
    const card={
        width:'100%',
        margin:'10px'
    }
    const  Goals = {
        borderStyle:'groove',
        marginBotton:'5px',
        padding:'3px'
    }
    const checkBox = {
        float: 'left',
    }
  
    const [goals, setGoals] = useState([]);

    async function getGoalList( localEmail){
        const obj = {
            email : localEmail 
        }
        //get info from server
        const userGoals = await axios.post( 'http://localhost:5000/api/getUserGoals', obj );
        console.log('user data', userGoals);

         setGoals( userGoals.data.goals );
         console.log(goals)
    }

  useEffect( ()=>{
        const localEmail = JSON.parse(localStorage.getItem('userEmail'));
    
        if ( !localEmail ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', localEmail );

         getGoalList( localEmail );
        }
    },[])

    return (
       <div>
        <div class="card" style={card}>
            <div class="card-body">
                <h5 class="card-title text-center">Today's Goals</h5>         
                {goals.map( goal => (
                    <h6 style={Goals} key={goal.id}><input type="checkbox" style={checkBox}/>{goal.title}</h6>
                 ))}
            </div>
        </div>
       
        </div>
       
        
    );
}

export default Goals;