import React from "react";
import { Link } from "react-router-dom";

function FollowerCard(props){

    // function Follow(){
    //     console.log( `[Follow] called...` );
    //     // the component is re-rendered multiple times, so it triggers this dispatch twice
    //     dispatch({ 
    //         do: 'addToCart', id, num: 1, ...showProduct });
    // }

    return(
        <div class="col-6 col-md-4">
            <div class="card">
                <div class="card-header">
                    <img class="rounded-circle" alt="70x70" src="https://placehold.it/70x70" data-holder-rendered="true" />
                </div>
                <div class="card-body">
                    {/* When you click on the follower's name you're brought to their dashboard  */}
                    {/* <Link to={'/dashboard/'+props.id}>
                    <h5 class="card-title">{props.firstName}  {props.lastName}</h5>
                    </Link> */}
                    {/* <a href="#" onClick={Follow} class="btn btn-primary">Follow</a> */}
                </div>
            </div>
        </div>
    )

}

export default FollowerCard;
