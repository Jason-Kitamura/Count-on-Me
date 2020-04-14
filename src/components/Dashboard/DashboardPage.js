import React from "react";
import CoverPhoto from './CoverPhoto';
import UserOptions from './UserOptions';
import TodoLists from './TodoLists.js';
import Followers from './Followers';
import Following from './Following';

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
    return (
        <div>
        <div>
            <h3  style={home}>Home Page</h3>
        </div>
        <div class='row' style={liveData}>
            <div class='col-12 col-md-8' style={columns}>
                <CoverPhoto />
            </div>
            <div class='col-12 col-md-3'style={columns} >
                <UserOptions />
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
        </div>
    );

}

export default HomePage;