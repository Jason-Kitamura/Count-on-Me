import React from 'react';


function Goals() {
    const card={
        width:'100%',
        margin:'10px'
    }
    const  Goals = {
        borderStyle:'groove',
        marginBotton:'5px',
        padding:'3px',
        textAlign:'left'
    }
   
   const styleForGoalsHeading = {
       marginBottom:'0px',
       textAlign:'left',
       paddingLeft:'20px',
       paddingTop:'10px',
       paddingBottom:'0px'
   }

    return (
       <div>
        <div class="card" style={card}>
        <h4 class="card-title" style={styleForGoalsHeading}><i class="fas fa-bullseye"></i>  Track Goals</h4>
            <div class="card-body">
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