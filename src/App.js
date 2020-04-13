import React from 'react';
import './App.css';

import SideBar from './components/SideBar';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';

function App() {
  const style = {
    RightSection: { border: "0px solid Purple" },
    SearchBox: { 
      border: "0px solid Black"
    },
    SearchResult: { 
      border: "0px solid Yellow"
    }
  }
  return (
    <div className="App">
        <div class="wrapper">

        <div class="sidebar"> <SideBar /> </div>
        <div class="container-fluid" style={style.RightSection} >
          <div class="d-flex flex-column h-100">
                  <div class="row">
                  <div class="col" style={style.SearchBox} >
                      <SearchBox />
                    </div>
                  </div>
                  <div class="row flex-grow-1">
                    <div class="col" style={style.SearchResult} >
                      <SearchResult /> 
                      {/* <p>dddddddd</p><p>dddddddd</p><p>dddddddd</p><p>dddddddd</p>
                      <p>dddddddd</p><p>dddddddd</p><p>dddddddd</p><p>dddddddd</p>
                      <p>dddddddd</p><p>dddddddd</p><p>dddddddd</p><p>dddddddd</p> */}
                      
                    </div>
                  </div>
          </div>
        </div>

      



        </div>
    </div>
  );
}

export default App;
