import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar( props ){
    const [showAttr, setShowAttr] = React.useState('Search');
    const theLocation = useLocation();

    return (
        <>
            <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Goal Tracker</h3>
            </div>

            <ul class="list-unstyled components">
            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar rounded-circle img-thumbnail" alt="avatar" />
                {/*<p><img class="rounded-circle" alt="100x100" src="https://placehold.it/100x100" data-holder-rendered="true" /></p>*/}
                <div class="text-center">

        
          {/*</div>*/}
          
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
                <li className={((showAttr === 'Portfolio') ? 'active' : '')}>
                    
                    <Link to="/porfolio" onClick={() => setShowAttr('Portfolio')} >
                        Portfolio
                    </Link>
                </li>
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
                </div>
            </ul>
        
        </nav>
        </>
    )
}

export default SideBar;