import './App.css';
import React from 'react';
import SideBar from './components/SideBar';
import SearchPage from './components/Search/SearchPage';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import SettingsPage from './components/Settings/SettingsPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import FriendsPage from './components/User/FriendsPage';



import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  const style = {
    ToggleSection: {
      border: "0px solid #2E4053",
      backgroundColor: '#2E4053',
      top:"100%",
      fontSize:'20px'

    },
    RightSection: {
      border: "0px solid Purple",
      padding:'0px'
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
  const left = {
  
    marginTop: '0px',
    height:'100%',
    paddingRight:'0px'
  }
  const right = {
    padding: '0px',
    paddingTop: '0rem'
  }

  return (
    <Router>
      {console.log("App.js Rendering....")}
      <div className="App">
        <div class="wrapper">

          <div class="sidebar">
            <Route path={["/search", "/dashBoard", "/home", "/settings", "/user/:id"]} component={SideBar} />
            
          </div>
          <button type="button" id="sidebarCollapse" class="btn btn-info" style={style.ToggleSection}> {/* Toggle Button */}
            <i class="fas fa-bars fa-1x"></i>
          </button>
          <div class="container-fluid" style={style.RightSection}>

            <div id="content" class="row " style={right}>

              <div class="col-12" style={left}>

                <Route path={["/search"]} component={SearchPage} />
                <Route path={["/dashboard"]} component={DashboardPage} />
                <Route path={["/home"]} component={HomePage} />
                <Route path={["/settings"]} component={SettingsPage} />
                <Route path={["/user/:id"]} component={FriendsPage} />
                <Route exact path={["/", "/login"]} component={LoginPage} />

                {/* <Route path="/settings/:id" component={ProductInfoPage} /> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
