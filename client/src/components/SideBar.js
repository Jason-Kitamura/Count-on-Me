import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarUpload from './AvatarUpload';
import axios from 'axios';
import { func } from "prop-types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function SideBar( props ){
    const [showAttr, setShowAttr] = React.useState('Home');
    const [ showForm, setShowForm] = useState( false )
    const theLocation = useLocation();
    const [profileLink,setProfileLink] = useState('');
    

    async function changeProfilePicture(){
        const userFromSessionStorage = JSON.parse(sessionStorage.getItem('userEmail'));
        console.log('[user mail id:]',userFromSessionStorage.email);
        const user = await axios.get( `/api/userData/${userFromSessionStorage.email}`);
        console.log(`[Profile picture Link ]`,user.data.profilePic)
        setProfileLink(`${user.data.profilePic}`)
    }

    function logOutUser(){
        sessionStorage.removeItem( 'userEmail' );
        toast.error('You have logged out!', {
            autoClose : 2000
        })
    }
    
        if(sessionStorage.getItem('userEmail') !== null){
            getProfilePic()
        }
    async function getProfilePic(){
        const userFromSessionStorage = JSON.parse(sessionStorage.getItem('userEmail'));
        console.log('[user mail id:]',userFromSessionStorage.email);
        const user = await axios.get( `/api/userData/${userFromSessionStorage.email}`);
        console.log(`[Profile picture Link ]`,user.data.profilePic)
        setProfileLink(`${user.data.profilePic}`)
    }
    function uploadPic( e ){
        e.preventDefault();
        setShowForm(false);
    } 
    const btn ={
        color:'white',marginTop:'0px'
    }


    return (
        <>
            <nav id="sidebar">
            <div class="sidebar-header">
                <h3> <i class="fas fa-chart-bar"></i> Count on-Me</h3>
            </div>
            <ul class="list-unstyled components">
                <div class="text-center">
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    >
                      
                            { { profileLink } === "" ?<img class="rounded-circle img-thumbnail" src="https://i.stack.imgur.com/34AD2.jpg" 
                            alt="avatar"
                            style={{
                                borderRadius:'50%',
                                width:'160px',
                                height:'150px',
                                padding:'0px'
                               
                            }}/> : <img  class="rounded-circle img-thumbnail" src={profileLink}
                            alt="avatar"
                            style={{
                                borderRadius:'50%',
                                width:'160px',
                                height:'150px',
                                padding:'0px'
                               }} />
                            }
                            { showForm ? <AvatarUpload uploadPic={uploadPic} changeProfilePicture={changeProfilePicture} /> : 
                                    <div >
                                        <button class="btn btnStyle" style={btn} onClick={function(){ setShowForm(true) }}>
                                        <i class="fas fa-screwdriver"></i></button>
                                    </div> }
                            
                    </div>
                    <li className={((showAttr === 'Home') ? 'active' : '')}>
                        <Link to="/home" onClick={() => setShowAttr('Home')} >
                            Home
                        </Link>
                    </li>
                    <li className={((showAttr === 'Search') ? 'active' : '')} >
                    {/* <a href="#" onClick={() => setShowAttr('Search')}>Search</a> */}
                    <Link to="/search" onClick={() => setShowAttr('Search')} >
                        Search
                    </Link>
                    </li>
                {/* <li>
                    <a href="#pageSubmenu" data-toggle="collapse" 
                        aria-expanded={((showAttr === 'Pages') ? 'true' : 'false')} 
                        onClick={() => setShowAttr('Pages')}
                        className={((showAttr === 'Pages') ? 'dropdown-toggle active' : 'dropdown-toggle ')}>Pages</a>
                    <ul className={((showAttr === 'Pages') ? 'list-unstyled collapse show' : 'list-unstyled collapse')} id="pageSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                    </ul>
                </li> */}
                <li className={((showAttr === 'Dashboard') ? 'active' : '')}>
                    <Link to="/dashboard" onClick={() => setShowAttr('Dashboard')} >
                        Dashboard
                    </Link>
                </li>
                {/* <li className={((showAttr === 'Portfolio') ? 'active' : '')}>
                    <Link to="/porfolio" onClick={() => setShowAttr('Portfolio')} >
                        Portfolio
                    </Link>
                </li> */}
                <li className={((showAttr === 'Settings') ? 'active' : '')}>
                    <Link to="/settings" onClick={() => setShowAttr('Settings')} >
                        Settings
                    </Link>
                </li>
                <li className={((showAttr === 'Logout') ? 'active' : '')}>
                    <Link to="/login" onClick={() => setShowAttr('Login')} onClick={logOutUser} >
                        Logout
                    </Link>
                </li>
                </div>
            </ul>
            </nav>
        </>
    )
}

export default SideBar;