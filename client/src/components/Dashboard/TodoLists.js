import React, {useEffect, useState} from 'react';

const axios = require('axios');


function Goals( props ) {
    const card={
        width:'100%',
        margin:'10px',
        marginLeft: '25px',
        marginRight: '25px',
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
    const [ habits , setHabits ]=useState([]);


    async function getGoalList( localEmail){
        const obj = {
            email : localEmail 
        }
        //get info from server
        const allGoals = await axios.post( '/api/getUserGoals', obj );
        const goalsArray = allGoals.data.goals
        const habitsArray = allGoals.data.habits
        console.log( 'data', allGoals, 'habits', habitsArray)

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

  useEffect( ()=>{
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
    
        if ( !user.email ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', user.email );

         getGoalList( user.email );
        }
    },[])

    async function completeGoal( id ){
        const obj = {
            id : id
        }
        //update in in database
        const updateGoalComplete = await axios.post( '/api/completeGoal', obj);
        console.log('Update goal complete', updateGoalComplete );
       
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        getGoalList( user.email );
    }
    async function undoGoal( id){
        const obj = {
            id : id
        }
        //update in in database
        const undoGoalComplete = await axios.post( '/api/undoGoal', obj);
        console.log('Undo goal complete', undoGoalComplete );
        //rerender component
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        getGoalList( user.email );
    }


    return (
        <div class='row' style={cardsContainer}>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center" style={titleStyle}>
                        Today's Goals
                        <i class="fas fa-plus fa-sm" aria-hidden="true" onClick={props.setGoal} style={{ float : 'right', cursor : 'pointer' }}></i>
                        </h5>
                    <hr/>
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
                    <h5 class="card-title text-center" style={titleStyle}>Completed Goals</h5>
                    <hr/>
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
                    <h5 class="card-title text-center" style={titleStyle}>
                        Habits Goals
                        <i class="fas fa-plus fa-sm" aria-hidden="true" onClick={props.setTask} style={{ float : 'right', cursor : 'pointer' }}></i>
                    </h5>
                    <hr/>
                    {habits.map( habit => (
                        <h6 style={Goals} >
                            <i class="fa fa-check" aria-hidden="true" style={checkBox}/>
                            {habit.title}
                        </h6>
                     ))}
                </div>
            </div>
        </div>
    );
}

export default Goals;