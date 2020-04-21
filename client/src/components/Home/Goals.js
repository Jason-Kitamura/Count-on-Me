import React, {useEffect, useState} from 'react';
const axios = require('axios');


function Goals( props ) {
    const card={
        width:'100%',
        margin:'10px',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',

    }
    const  Goals = {
        border : 'solid thin grey',
        marginBotton:'5px',
        padding:'3px',
        boxShadow: '3px 3px 5px  #666666'

    }
    const checkBox = {
        float: 'left',
        cursor : 'pointer',

    }
    const completeBox = {
        float: 'right',
        lineHeight : '0',
        marginTop : '2px',
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
                <h5 class="card-title text-center" style={{ fontWeight : 'bold' }}>
                    Today's Goals
                    <button class='btn btn-light' onClick={props.setGoal} style={{ float : 'right' }} ><i class="fas fa-plus"></i></button>
                    </h5>        
                    <hr/> 
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