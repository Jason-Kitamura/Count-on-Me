import React,{useState, useEffect} from 'react';
const axios = require('axios');

function GoalModal(props) {
    const [display, setDisplay] = useState(true);
    const [goal,setGoal] = useState({title:"",description:'',StartDate:'',EndDate:''});
    const[ email, setEmail ] = useState('')
   
    function setUserEmail( userEmail ){
        setEmail( userEmail );
    }

    useEffect( ()=>{
        const user = JSON.parse(sessionStorage.getItem('userEmail'));
    
        if ( !user.email ){
            console.log( 'logged out!' );
        } else {
            console.log( 'logged in!', user.email );
            setUserEmail( user.email );
        }
    },[])

    //setDisplay(props.show)
    const modalWrapper = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    }
    const modalBackdrop = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.4)"
    }
    const modalBox = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '70%',
        width: '70%',
        overflowY: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        zIndex: 101,
        padding: '40px',
        marginTop:'10px',
        marginBottom:'10px'
    }
    const insideForm = {
        margin: '3px'
    }
  
    const input = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '15px auto',
        justifyContent: 'center',
        alignItems: 'center',
        button:{
            width :'30%'
        },
        fontFamily: 'Comic Neue'
    }

    const close = {
        position: 'absolute',
        top: 0,
        right: '14px',
        fontSize: '23px',
        transform: 'rotate(45deg)',
        cursor: 'pointer',
       color:'black'
    }
    const quotation = {
        fontFamily: 'Comic Neue',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
    const goalForm ={
        borderColor:'#424242',
        borderStyle:'solid',
        borderRadius:'5px',
        marginTop:'4px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        boxShadow: '3px 3px 3px #888888'
    }
    const modalForm={
        height:'100%',
        flex:1,
        flexDirection:'columns'

    }
    const formHead={
        fontFamily: 'Comic Neue'
    }
    function handleInputChange(e){
        const { id, value } = e.target; //

        setGoal( { ...goal, [id]: value } );

    }

  async function registerGoals(){
        console.log('[Goal set by User]',goal);
        const newUserGoal = { email, goal }
        console.log( 'new User Goal', newUserGoal );
        //sending to server
        const newGoal = await axios.post( '/api/createGoal', newUserGoal );
        console.log( 'new goal', newGoal);
        setDisplay( false );
    }


    if(display === props.show){
    return (
        <div className={'modal-wrapper'} style={modalWrapper}>
            <div className={'modal-backdrop'} style={modalBackdrop} />
            <div className={'modal-box'} style={modalBox}>
                <div class='close' onClick={props.closeGoal} style={close}>
                    +
                </div>
                <div class='row' style={modalForm}>
                    <div class='col-12 col-sm-5' style={quotation}>
                        <h2>"If you want to be happy, set a goal that commands your thoughts, liberates your energy and inspires your hopes."</h2>
                        <h3>—Andrew Carnegie</h3>
                    </div>
                    <hr />
                    <div class='col-12 col-sm-5' style={goalForm}>
                        <h3 style={formHead}>Set your Goal Today</h3>
                        <form >
                            <div class="form-row" style={input}>
                                <div class="col">
                                    <input style={insideForm} onChange={handleInputChange} type="text" id='title' class="form-control" placeholder="Enter Your Goal Title" />
                                </div>
                                <div class="col">
                                    <textarea style={insideForm} type="text" onChange={handleInputChange} class="form-control" id='description' placeholder="Description" />
                                </div>
                                <div class='col'>
                                    <label >Start Date</label>< input style={insideForm} onChange={handleInputChange} type="date" id="StartDate" name="Start Date"></input>
                                </div>
                                <div class='col'>
                                    <label>End Date</label><input style={insideForm} onChange={handleInputChange} type="date" id="EndDate" name="End Date"></input>
                                </div>
                            </div>
                            <button type="button" onClick={registerGoals} style={input.button} class="btn btn-outline-dark">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );}
    return null;
}

export default GoalModal;