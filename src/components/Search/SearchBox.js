import React from "react";
import fs from 'fs';



function SearchBox( props ){
    const txtSearch = React.useRef();

    console.log("<<Test the react cycle... from inside component body >>")


    const style = {
        SearchBoxLeft: { 
          border: "0px solid Red" },
          SearchBoxRight: { 
          border: "0px solid Gray"
        }
      }


    function searched(event) {
        event.preventDefault();

        // console.log(txtSearch.current.value);
        console.log("<<Test the react cycle... from inside searched function>>")
        props.searchCallback(txtSearch.current.value);

    }

    return (
        <>
        
        {/* <h4>Search Box</h4> */}
        <form>
            <div class="row mb-0 d-flex justify-content-center form-group">
                <div class="col-6 d-flex justify-content-end pr-0 pl-0" style={style.SearchBoxLeft} >
                    <label for="searchtxt"></label>
                    <input id="searchtxt" type="text" ref={txtSearch} class="form-control"></input>
                </div>
                <div class="col-2 d-flex justify-content-start pl-0" style={style.SearchBoxRight} >

                    {/* <button onClick={()=>searched()} class="btn btn-primary submit">Search</button> */}
                    <button onClick={searched} class="btn btn-primary submit">Search</button>

                </div>
            </div>
        </form>
        {console.log("<<Test the react cycle... from inside return section >>")}

        </>
    )
}

export default SearchBox;