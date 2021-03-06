import React from "react";
import { Link } from "react-router-dom";

function SearchResult(props) {
    const card={
        width:'18rem',
        boxShadow:'3px 3px 3px 3px #888888',
        fontFamily: 'Antic'
    }
    const imga={
       margin:'0px',
       padding:'10px'
    }
    const profile={
        marginBottom:'5px'
    }
    
    return (
        <div class="card" style={card}>
            <div class="card-body d-flex flex-column">
                <div>
                <img style={imga} src={props.img} class="rounded-circle mr-3" height="170px" width="170px" alt="avatar" />
                </div>
                <div >
                    <Link to={'/user/'+props.id}>
                        <h4 style={profile} class="card-title font-weight-bold mb-2">{props.result}</h4>
                    </Link>
                    <button style={profile} type="button" ref={props.btn} onClick={props.addFollower} class="btn btn-primary ">Follow</button>
                </div>
            </div>
        </div>


    );
}

export default SearchResult;