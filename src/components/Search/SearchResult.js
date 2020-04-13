import React from "react";

function SearchResult( props ){
    
    return (
        <>        
            {/* <h2>Search Result</h2> */}
            <div class="container">
                {props.searchResults.map(item => ( <Item key={item.id} item={item} /> ))}
                {/* {products.map( product=><ProductCard {...product} />)} */}
            </div>
        </>
    )


    function Item({ item }) {
        return (
                <div class="row d-flex justify-content-center mt-2">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-header">
                                <img class="rounded-circle" alt="70x70" src="https://placehold.it/70x70" data-holder-rendered="true" />
                            </div>
                            
                            <div class="card-body">
                                <h5 class="card-title">{item.firstname} {item.lastname}</h5>
                                <a href="#" class="btn btn-primary">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
        );
      }

}

export default SearchResult;