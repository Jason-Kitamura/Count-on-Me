import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarUpload from './AvatarUpload';
import axios from 'axios';
import { func } from "prop-types";
function SideBar( props ){
    const [showAttr, setShowAttr] = React.useState('Home');
    const theLocation = useLocation();
    const [profileLink,setProfileLink] = useState('');
    
    function logOutUser(){
        localStorage.removeItem( 'userEmail' );
        alert('you have logged out!')
    }
    
        if(sessionStorage.getItem('userEmail') !== null){
            getProfilePic()
        }
    async function getProfilePic(){
        const userFromSessionStorage = JSON.parse(sessionStorage.getItem('userEmail'));
        console.log('[user mail id:]',userFromSessionStorage.email);
        const user = await axios.get( `/api/userData/${userFromSessionStorage.email}`);
        console.log(`[Profile picture Link ]`,user.data.profilePic)
        setProfileLink(user.data.profilePic)
    }

    return (
        <>
            <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Goal Tracker</h3>
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
                        <AvatarUpload />
                        {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                        />
                        <div
                        style={{
                            height: "180px",
                            width: "180px",
                        }}
                        onClick={() => imageUploader.current.click()}
                        >
                            <img
                            src="https://pickaface.net/gallery/avatar/20151109_144853_2380_sample.png"
                            class="avatar rounded-circle img-thumbnail"
                            name="profile"
                            ref={uploadedImage}
                            alt="avatar"
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "acsolute"
                            }}
                            />
                        </div>
                        Click to upload Image*/}
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
                <li className={((showAttr === 'Login') ? 'active' : '')}>
                    <Link to="/login" onClick={() => setShowAttr('Login')} >
                        Login
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