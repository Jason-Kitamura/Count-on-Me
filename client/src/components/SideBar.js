import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar( props ){
    const [showAttr, setShowAttr] = React.useState('Home');
    const theLocation = useLocation();

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    function logOutUser(){
        sessionStorage.removeItem( 'userEmail' );
        alert('you have logged out!')
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
                        <input
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
                            ref={uploadedImage}
                            alt="avatar"
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "acsolute"
                            }}
                            />
                        </div>
                        Click to upload Image
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