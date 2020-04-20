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
        cursor : 'pointer',

    }
    const completeBox = {
        float: 'right',
        fontSize : 'small',
        cursor : 'pointer',
    }
  
    const [goals, setGoals] = useState([]);
    const [completed, setCompleted] = useState([]);


    async function getGoalList( localEmail){
        const obj = {
            email : localEmail 
        }
        //get info from server
        const userGoals = await axios.post( '/api/getUserGoals', obj );
        const goalsArray = userGoals.data.goals

        const incompletedGoals = goalsArray.filter( goal => {
            return goal.completed === false;
        })
        console.log('incompleted goals', incompletedGoals);
        setGoals( incompletedGoals );

        const completedGoals = goalsArray.filter( goal => {
            return goal.completed === true;
        })
        console.log('completed goals', completedGoals);
        setCompleted( completedGoals );
    }

  useEffect( ()=>{
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
    
        if ( !user.email ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', user.email );

         getGoalList( user.email );
        }
    },[])
    async function completeGoal( id){
        const obj = {
            id : id
        }
        //update in in database
        const updateGoalComplete = await axios.post( '/api/completeGoal', obj);
        console.log('Update goal complete', updateGoalComplete );
        //re render page
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        getGoalList( user.email );
    }
    async function undoGoal( id ){
        const obj = {
            id : id
        }
        //update in in database
        const undoGoalComplete = await axios.post( '/api/undoGoal', obj);
        console.log('Undo goal complete', undoGoalComplete );
        //re render page
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        getGoalList( user.email );
    }

    return (
       <div>
        <div class="card" style={card}>
            <div class="card-body">
                <h5 class="card-title text-center">Today's Goals</h5>         
                {goals.map( goal => (
                    <h6 style={Goals} key={goal.id}>
                        <input type="checkbox" checked={false} onClick={e => {completeGoal( goal._id)}} style={checkBox}/>
                        {goal.title}
                    </h6>
                 ))}
                 {completed.map( goal => (
                    <h6 style={Goals} key={goal.id}>
                        <i class="fa fa-check" aria-hidden="true" style={checkBox}/>
                        <p onClick={e => {undoGoal( goal._id)}} style={completeBox}>
                            undo
                        </p>
                        {goal.title}
                    </h6>
                 ))}
            </div>
        </div>
       
        </div>
       
        
    );
}

export default Goals;