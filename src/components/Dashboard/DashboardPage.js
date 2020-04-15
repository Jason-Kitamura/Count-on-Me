import React,{useState} from "react";
import CoverPhoto from './CoverPhoto';
import UserOptions from './UserOptions';
import TodoLists from './TodoLists.js';
import Followers from './Followers';
import Following from './Following';
import GoalModal from '../Home/GoalModal';
function HomePage(){
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
       margin:'0px'
       
   }
   const columns = {
       padding:'0',
       margin:'4px'
   }
   const selectOption = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
}
   const [show,setShow] = useState(false);
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
            <div class='col-12 col-md-8' style={columns}>
                <CoverPhoto />     <button class='btn btn-light' onClick={addGoal} style={selectOption}><i class="fas fa-plus"></i>   Add New Goal</button>
            </div>
            <div class='col-12 col-md-3'style={columns} >
                <UserOptions addGoal={addGoal} />
                
            </div>
        </div>
        <div class='row' style={liveData}>
            <TodoLists />
        </div>
        <div class='row' style={liveData}>
            <Followers />
        </div>
        <div class='row' style={liveData}>
            <Following />
        </div>
        <GoalModal show={show} closeGoal={closeGoal}/>
        </div>
    );

}

export default HomePage;