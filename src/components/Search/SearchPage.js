import React, {useState} from "react";
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

function SearchPage( props ){
    const [result, setResult] = useState([]);

    const style = {
        SearchBox: { 
          border: "0px solid Black" },
        SearchResult: { 
          border: "0px solid Yellow"
        }
      }


      var tempResults = [
                              {  "id": "111",
                                "firstname": "Result 1",
                                "lastname": "-",
                                "image": "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/136/13694/13694581.jpg",
                              },
                              {  "id": "222",
                                "firstname": "Result 2",
                                "lastname": "-",
                                "image": "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/136/13694/13694581.jpg",
                              },
                              {  "id": "333",
                                "firstname": "Result 3",
                                "lastname": "-",
                                "image": "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/136/13694/13694581.jpg",
                              },
        
                            ]


    function searchFunc(searchinput){
      // alert("prepare the serach result ");
      setResult(tempResults);

    }

    return (
        <>
            {console.log("Search Page Rendering....")}
            <div class="d-flex flex-column h-100">
                    <div class="row">
                        <div class="col" style={style.SearchBox} > <SearchBox searchCallback={searchFunc} /> </div>
                    </div>
                    <div class="row flex-grow-1">
                        <div class="col" style={style.SearchResult} > <SearchResult searchResults={result} /> </div>
                    </div>
            </div>
        </>
    )
}

export default SearchPage;