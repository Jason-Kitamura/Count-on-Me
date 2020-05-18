import React,{useState, useRef, useEffect, useContext} from "react";
//import ReactDOM from "react-dom";
//import $ from 'jquery';
//import SearchBox from './SearchBox';
//import SearchResult from './SearchResult';

const axios = require('axios');

function SettingsPage( props ){

  //Checking user login 
 

   const [ user, setUser ]= useState([]);
   const [ firstName, setUserFirstName ] = useState([]);
   const [ lastName, setUserLastName ] = useState([]);
   const [ password, setPassword ] = useState([]);
   const followers = useRef(null);
   const following = useRef(null);


  useEffect( function(){
      
       getUser();
   }, [] );

  async function getUser(){
    const userEmail = JSON.parse(sessionStorage.getItem('userEmail')).email;

   console.log(`calling axios.get for email: `, userEmail)
   const user = await axios.get( `/api/userData/${userEmail}`);

   if( user.error ){
       console.log(`error getting from db`, user.error)
       return;
   }
   
   setUser( userEmail );
   console.log( `Retrieved user data:`, user);

   let firstName = user.data.firstName;
   firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
   setUserFirstName( firstName )

   let lastName = user.data.lastName;
   lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
   setUserLastName( lastName )

   console.log(`User first:`, firstName , `user last`, lastName)

   let password = user.data.password;
   setPassword( password )
  }

  const home = {
    width:'100%',
    height:'70px',
    textAlign:'center',
    fontFamily: "'Noto Sans', sans-serif",
    color:'white',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'rgb(230, 126, 34)'
    
}

const row={
  height:'100%',
  width:'100%'
}
const col = {
  padding:'0px',
  paddingLeft:'15px'
}
    return (
        <>
        
          <div class="row" style={row}>
            <div class="col-md-12 col-sm-12 col-xs-12 personal-info" style={col}>
              <div class="alert alert-info alert-dismissable" style={{display:"none"}}>
                <a class="panel-close close" data-dismiss="alert">×</a>
                This is an <strong>alert</strong> to show important messages to the user.
              </div>
            <div style={home}>
            <h3>Personal info</h3>
            </div>
            <br></br>
            <br></br>
              <div class="form-group">
                <div class="row">
                <label class="col-lg-3 control-label" >First name:</label>
                <div class="col-lg-8">
                  <input class="form-control" value={firstName} type="text" />
                </div>
                </div>
              </div>    
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Last name:</label>
                <div class="col-lg-8">
                  <input class="form-control" value={lastName} type="text" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Email:</label>
                <div class="col-lg-8">
                  <input class="form-control" value={user} type="text" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Username:</label>
                <div class="col-lg-8">
                  <input class="form-control" value="janeuser" type="text" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Password:</label>
                <div class="col-lg-8">
                  <input class="form-control" value={password} type="password" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Confirm password:</label>
                <div class="col-lg-8">
                  <input class="form-control" value={password} type="password" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label"></label>
                <div class="col-lg-8">
                  <input class="btn btn-primary" value="Save Changes" type="button" />
                  <span></span>
                  <input class="btn btn-default" value="Cancel" type="reset" />
                </div>
                </div>
              </div>
            </div>
            </div>
            
        </>
    )
}

export default SettingsPage;