import React from "react";

function SearchBox( props ){
    return (
        <>
        <div id="content">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                        <span>&nbsp;</span>
                    </button>
                    <h2>Search Box</h2>
                </div>
            </nav>
        </div>
        </>
    )
}

export default SearchBox;