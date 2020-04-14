import React from 'react';

function Goals() {
    const card={
        width:'100%',
        margin:'10px',
        marginLeft: '25px',
        marginRight: '25px',
    }
    const  Goals = {
        borderStyle:'groove',
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

    return (
        <div class='row' style={cardsContainer}>
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
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
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Completed Goals</h5>
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
            <div class="card col-12 col-lg-3 col-md-6" style={card}>
                <div class="card-body">
                    <h5 class="card-title text-center">Habits Goals</h5>
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