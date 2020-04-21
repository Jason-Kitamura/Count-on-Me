import React,{useState, useEffect} from 'react';
const axios = require('axios');

function TaskModel( props ){
    const modelWrapper = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    }
    const modelBackdrop = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.4)"
    }
    const modelBox = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '400px',
        width: '300px',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        zIndex: 101,
        marginTop:'10px',
        marginBottom:'10px'
    }
    const exitBtn = {
        float : 'right',
        cursor : 'hover'
    }
     const habitTitleStyle = {
        fontFamily :  'Comic Sans MS, Comic Sans, cursive',
        fontWeight : 'bold',
        marginTop : '100px',
        marginBottom : '30px'
     }

    const [ habit, setHabit ] = useState('');
    const [display, setDisplay] = useState(true);


    useEffect( ()=>{
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        
    },[])
    function handleHabitChange(e, value){
        e.preventDefault();
        setHabit( value )
        console.log( 'habit', habit );
    }
    async function registerTask( e ){
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
        const obj = {
            email : user.email,
            habit : habit
        }
        const userHabit = await axios.post( '/api/newHabit', obj );
        props.closeTask();
    }
    function exitHabit(e){
        e.preventDefault();
        props.closeTask();
    }

    
    if(display === props.show){
        return (
            <div className={'model-wrapper'} style={modelWrapper}>
                <div className={'model-backdrop'} style={modelBackdrop} />
                <div className={'model-box'} style={modelBox}>
                    <i class="fa fa-times" onClick={exitHabit} style={exitBtn}></i>
                    <h3 style={habitTitleStyle}>New Habit</h3>
                    <form>
                        <input placeholder='Start a new Habit' onChange={(e) => {handleHabitChange( e, e.target.value )}} ></input>
                        <button onClick={(e)=>{registerTask(e)}} >Add</button>
                    </form>
                </div> 
            </div>
        );}
        return null;
}

export default TaskModel;