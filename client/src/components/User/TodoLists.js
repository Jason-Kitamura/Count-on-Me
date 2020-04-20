import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

const axios = require('axios');


function Goals(props) {
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
    const [completed, setCompleted] = useState([]);
    const  id  = useParams();
    console.log(`Calling for `, { id })



   useEffect( function(){
    getGoalList();
    console.log('use effect is called for getting todos');
    }, [] );


    async function getGoalList(){
        console.log(`calling axios.get for todos id: `, id)
        const allGoals = await axios.post( 'http://localhost:5000/api/getFriendGoals', id );
 
        if( allGoals.error ){
            console.log(`error getting from db`, allGoals.error)
            return;
        }

        const goalsArray = allGoals.data.goals
        console.log(`Front end recieved todos:`, goalsArray)

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

    return (
        <div class='row' style={cardsContainer}>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Today's Goals</h5>
                    {goals.map( goal => (
                        <h6 style={Goals} key={goal._id}>
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