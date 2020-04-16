import React from "react";
//import ReactDOM from "react-dom";
//import $ from 'jquery';
//import SearchBox from './SearchBox';
//import SearchResult from './SearchResult';

function SettingsPage( props ){


    return (
        <>
        <div class="d-flex flex-column h-100">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
              <div class="alert alert-info alert-dismissable" style={{display:"none"}}>
                <a class="panel-close close" data-dismiss="alert">×</a>
                This is an <strong>alert</strong> to show important messages to the user.
              </div>
            <h3>Personal info</h3>
            <br></br>
            <br></br>
              <div class="form-group">
                <div class="row">
                <label class="col-lg-3 control-label" >First name:</label>
                <div class="col-lg-8">
                  <input class="form-control" value="Jane" type="text" />
                </div>
                </div>
              </div>    
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Last name:</label>
                <div class="col-lg-8">
                  <input class="form-control" value="Bishop" type="text" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Email:</label>
                <div class="col-lg-8">
                  <input class="form-control" value="janesemail@gmail.com" type="text" />
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
                  <input class="form-control" value="11111122333" type="password" />
                </div>
                </div>
              </div>
              <div class="form-group">
              <div class="row">
                <label class="col-lg-3 control-label">Confirm password:</label>
                <div class="col-lg-8">
                  <input class="form-control" value="11111122333" type="password" />
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
            </div>
        </>
    )
}

export default SettingsPage;