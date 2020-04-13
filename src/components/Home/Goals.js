import React from 'react';

function Goals() {
    const card={
        width:'100%',
        margin:'10px'
    }
    const  Goals = {
        borderStyle:'groove',
        marginBotton:'5px',
        padding:'3px'
    }
    const newGoal = {
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    }
    return (
        <div class="card" style={card}>
            <div class="card-body">
                <h5 class="card-title text-center">Today's Goals</h5>
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
                <button class='btn btn-light' style={newGoal}><i class="fas fa-plus"></i>   Add New Goal</button>
            </div>
        </div>
    );
}

export default Goals;