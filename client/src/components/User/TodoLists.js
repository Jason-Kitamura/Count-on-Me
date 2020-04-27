import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

const axios = require('axios');


function Goals(props) {
    const card={
        width:'100%',
        margin:'10px',
        marginLeft: '25px',
        marginRight: '25px',
        boxShadow : '2px 2px 8px  #999999'

    }
    const titleStyle = {
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',
        fontWeight : 'bold',
        fontSize : 'large'
    }
    const  Goals = {
        display : 'block',
        margin : 'auto',
        border : 'solid thin grey',
        width : '100%',
        boxShadow: '3px 3px 5px  #666666',
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',
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
        color : 'limegreen'
    }

    const [goals, setGoals] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [ habits, setHabits ] = useState([]);
    const  id  = useParams();
    // console.log(`Calling for `, { id })



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

        const goalsArray = allGoals.data.goals;
        const habitsArray = allGoals.data.habits;

        setHabits( habitsArray );

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
                    <h5 class="card-title text-center" style={titleStyle}>Today's Goals</h5>
                    <hr/>
                    {goals.map( goal => (
                        <h6 style={Goals} key={goal._id}>
                            {goal.title}
                        </h6>
                     ))}
                </div>
            </div>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center" style={titleStyle}>Completed Goals</h5>
                    <hr/>
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
                    <h5 class="card-title text-center" style={titleStyle}>
                        Habits
                    </h5>
                    <hr/>
                    {habits.map( habit => (
                        <h6 style={Goals} >
                            {habit.title}
                        </h6>
                     ))}
                </div>
            </div>
        </div>
    );
}

export default Goals;