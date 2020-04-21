import React, { useState } from "react";
import Posts from './Posts';
import Goals from './Goals';
import Comments from './Comments';
import GoalModal from './GoalModal';

function HomePage(){
    const [show,setShow] = useState(false);
    
       const home = {
       width:'100%',
       height:'50px',
       textAlign:'center',
       backgroundColor:'rgb(230, 126, 34)',
       color:'white',
       fontFamily: "'Noto Sans', sans-serif",
       borderStyle:'groove'
   }
   const liveData = {
       flex:1,
       flexDirection:'row',
       padding:'10px',
       margin:'0px',
      
       
   }
   const columns = {
       padding:'0',
       margin:'4px'
   }
   const columns2 = {
    padding:'0',
    margin:'4px',
    
}
   const newGoal = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
}

async function addGoal(){
    console.log('[Add New GOAL button pressed]',show)
    setShow(true);
}
async function closeGoal(){
    setShow(false);
}
   
    return (
        <div>
        <div>
            <h3  style={home}>Home Page</h3>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-sm-12 col-md-7' style={columns}>
            <Posts />
            </div>
            <div class='col-12 col-sm-12 col-md-4'style={columns2} >
            <Goals setGoal={addGoal} />
            <Comments />
            <GoalModal show={show} closeGoal={closeGoal}/>
            </div>
        </div>
        
        </div>
    );

}

export default HomePage;