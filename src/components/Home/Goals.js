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
    const completeBox = {
        float: 'right',
    }
  
    const [goals, setGoals] = useState([]);
    const [completed, setCompleted] = useState([]);


    async function getGoalList( localEmail){
        const obj = {
            email : localEmail 
        }
        //get info from server
        const userGoals = await axios.post( 'http://localhost:5000/api/getUserGoals', obj );
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
        const localEmail = JSON.parse(localStorage.getItem('userEmail'));
    
        if ( !localEmail ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', localEmail );

         getGoalList( localEmail );
        }
    },[])
    async function completeGoal( e,id){
        console.log(e, id);
        if ( e === true ){
            const obj = {
                id : id
            }
            //update in in database
          const updateGoalComplete = await axios.post( 'http://localhost:5000/api/completeGoal', obj);
          console.log('Update goal complete', updateGoalComplete );
        } else {
            const obj = {
                id : id
            }
            //update in in database
          const undoGoalComplete = await axios.post( 'http://localhost:5000/api/undoGoal', obj);
          console.log('Undo goal complete', undoGoalComplete );
        }
    }
    async function undoGoal( e,id){
        console.log(e, id);
        if ( e === false ){
            const obj = {
                id : id
            }
            //update in in database
          const updateGoalComplete = await axios.post( 'http://localhost:5000/api/completeGoal', obj);
          console.log('Update goal complete', updateGoalComplete );
        } else {
            const obj = {
                id : id
            }
            //update in in database
          const undoGoalComplete = await axios.post( 'http://localhost:5000/api/undoGoal', obj);
          console.log('Undo goal complete', undoGoalComplete );
        }
    }

    return (
       <div>
        <div class="card" style={card}>
            <div class="card-body">
                <h5 class="card-title text-center">Today's Goals</h5>         
                {goals.map( goal => (
                    <h6 style={Goals} key={goal.id}><input type="checkbox" onChange={e => {completeGoal(e.target.checked, goal._id)}} style={checkBox}/>{goal.title}</h6>
                 ))}
                 {completed.map( goal => (
                    <h6 style={Goals} key={goal.id}><i class="fa fa-check" aria-hidden="true" style={checkBox}></i><input type="checkbox"  onChange={e => {undoGoal(e.target.checked, goal._id)}} style={completeBox}/>{goal.title}</h6>
                 ))}
            </div>
        </div>
       
        </div>
       
        
    );
}

export default Goals;