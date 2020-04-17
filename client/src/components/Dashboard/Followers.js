import React from 'react';

function Goals() {
    const card={
        width:'100%',
        margin:'10px',
    }

    const cardsContainer = {
        flex:1,
        flexDirection:'row',
        padding:'10px',
        margin:'20px',
        marginTop: '45px',
        marginLeft: '0px'
        
    }

    return (
        <div class='row' style={cardsContainer}>    
            <div class="card col-12" style={card}>
                <div class="card-body">

                    Followers

                    <div class="row d-flex justify-content-center mt-2">
                    <div class="col-6 col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <img class="rounded-circle" alt="70x70" src="https://placehold.it/70x70" data-holder-rendered="true" />
                            </div>
                            
                            <div class="card-body">
                                <h5 class="card-title">First Last</h5>
                                <a href="#" class="btn btn-primary">Follow</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <img class="rounded-circle" alt="70x70" src="https://placehold.it/70x70" data-holder-rendered="true" />
                            </div>
                            
                            <div class="card-body">
                                <h5 class="card-title">First Last</h5>
                                <a href="#" class="btn btn-primary">Follow</a>
                            </div>
                        </div>
                    </div>
                     <div class="col-6 col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <img class="rounded-circle" alt="70x70" src="https://placehold.it/70x70" data-holder-rendered="true" />
                            </div>
                            
                            <div class="card-body">
                                <h5 class="card-title">First Last</h5>
                                <a href="#" class="btn btn-primary">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
}

export default Goals;