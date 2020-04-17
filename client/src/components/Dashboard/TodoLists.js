import React, {useEffect, useState} from 'react';

const axios = require('axios');


function Goals() {
    const card={
        width:'100%',
        margin:'10px',
        marginLeft: '25px',
        marginRight: '25px',
    }
    const  Goals = {
        borderStyle:'groove',
        marginBottom:'5px',
        padding:'3px'
    }
    const newGoal = {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    }
    const cardsContainer = {
        flex:1,
        flexDirection:'row',
        padding:'10px',
        margin:'0px',
        marginTop: '45px',
        marginLeft: '0px'
        
    }
    const checkBox = {
        float: 'left',
    }
    const undoBtn = {
        float: 'right',
        fontSize : 'small',
        cursor : 'pointer',
        margin: '0px'
    }

    const [goals, setGoals] = useState([]);
    const [completed, setCompleted] = useState([]);


    async function getGoalList( localEmail){
        const obj = {
            email : localEmail 
        }
        //get info from server
        const allGoals = await axios.post( 'http://localhost:5000/api/getUserGoals', obj );
        const goalsArray = allGoals.data.goals

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

    async function completeGoal( id ){
        const obj = {
            id : id
        }
        //update in in database
        const updateGoalComplete = await axios.post( '/api/completeGoal', obj);
        console.log('Update goal complete', updateGoalComplete );
       
        const localEmail1 = JSON.parse(localStorage.getItem('userEmail'));
        getGoalList( localEmail1 );
    }
    async function undoGoal( id){
        const obj = {
            id : id
        }
        //update in in database
        const undoGoalComplete = await axios.post( '/api/undoGoal', obj);
        console.log('Undo goal complete', undoGoalComplete );
        //rerender component
        const localEmail2 = JSON.parse(localStorage.getItem('userEmail'));
        getGoalList( localEmail2 );
    }

    return (
        <div class='row' style={cardsContainer}>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Today's Goals</h5>
                    {goals.map( goal => (
                        <h6 style={Goals} key={goal._id}>
                            <input onClick={e => {completeGoal( goal._id)}} type="checkbox" checked={false} style={checkBox}/>
                            {goal.title}
                        </h6>
                     ))}
                </div>
            </div>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Completed Goals</h5>
                    {completed.map( goal => (
                        <h6 style={Goals} key={goal._id}>
                            <i class="fa fa-check" aria-hidden="true" style={checkBox}/>
                            {goal.title}
                            <p onClick={e => {undoGoal(goal._id)}} style={undoBtn}>
                                undo
                            </p>
                        </h6>
                     ))}
                </div>
            </div>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Habits Goals</h5>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Eat</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Sleep</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Study</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Excercise</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Repeat</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Eat</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Sleep</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Study</h6>
                    <h6 style={Goals}>  <i class="far fa-square"></i>   Excercise</h6>
                    <h6 style={Goals}> <i class="fas fa-check-square"></i>   Repeat</h6>
                </div>
            </div>
        </div>
    );
}

export default Goals;