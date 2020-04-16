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
    function goalChecked( e,id){
        console.log(e, id);
        if ( e === true ){
            
        }
    }

    return (
        <div class='row' style={cardsContainer}>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Today's Goals</h5>
                    {goals.map( goal => (
                    <h6 style={Goals} key={goal.id}><input onChange={e => {goalChecked(e.target.checked, goal._id)}} type="checkbox" style={checkBox}/> {goal.title}</h6>
                 ))}
                </div>
            </div>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Completed Goals</h5>
                    <h6 style={Goals}>  <input type="checkbox" style={checkBox}/>   Eat</h6>
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