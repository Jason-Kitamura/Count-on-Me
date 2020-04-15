import './App.css';
import React from 'react';
import SideBar from './components/SideBar';
import SearchPage from './components/Search/SearchPage';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import SettingsPage from './components/Settings/SettingsPage';


import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  const style = {
    ToggleSection: {
      border: "0px solid lightgreen"
    },
    RightSection: {
      border: "0px solid Purple"
    }
  }
  const modal = {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0,0,0,0.7)",
    position: 'absolute',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const modalContent = {
    width: '400px',
    height: '600px',
    backgroundColor: 'white',
    

  }
  


  return (
    <Router>
      {console.log("App.js Rendering....")}

      <div className="App">
        <div class="wrapper">

          <div class="sidebar"> <SideBar /> </div>

          <div class="container-fluid" style={style.RightSection}>

            <div id="content" class="row pt-2">
              <div class="col-1 d-flex justify-content-start pl-0 align-self-baseline" style={style.ToggleSection}>
                {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">  */}
                <button type="button" id="sidebarCollapse" class="btn btn-info"> {/* Toggle Button */}
                  <i class="fas fa-align-left"></i>
                </button>
                {/* </nav> */}
              </div>

              <div class="col-11 ">
                <Route exact path={["/", "/search"]} component={SearchPage} />
                <Route path={["/login"]} component={LoginPage} />
                <Route path={["/home"]} component={HomePage} />
                <Route path={["/settings"]} component={SettingsPage} />


                {/* <Route path="/settings/:id" component={ProductInfoPage} /> */}

              </div>

            </div>

          </div>
          {/* <div class='bg-modal' style={modal}>
            <div class='modal-content' style={modalContent}>
              <div class='close' style={close}>
              +
              </div>
              <div style={addGoal}>
                <h3>ADD GOAL</h3>
              </div>
              <form style={formStyle}>
                <div class="form-row" style={input}>
                  <div class="col">
                    <input style={insideForm} type="text" class="form-control" placeholder="Enter Your Goal Title" />
                  </div>
                  <div class="col">
                    <textarea style={insideForm} type="text" class="form-control" placeholder="Description" />
                  </div>
                  <div class='col'>
                  <label >Start Date</label> < input style={insideForm} type="date" id="Start Date" name="Start Date"></input>
                  </div>
                  <div class='col'>
                  <label>End Date</label> <input style={insideForm} type="date" id="End Date" name="End Date"></input>
                </div>
                </div>
                <button class="btn btn-secondary" type="submit">Submit form</button>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
