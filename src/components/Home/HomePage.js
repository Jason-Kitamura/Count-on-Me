import React from "react";
import Posts from './Posts';
import Goals from './Goals';
import Comments from './Comments';

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
            <div class='col-12 col-sm-12 col-md-7' style={columns}>
            <Posts />
            </div>
            <div class='col-12 col-sm-12 col-md-4'style={columns} >
            <Goals />
            <Comments />
            </div>
        </div>
        </div>
    );

}

export default HomePage;