import React, {useState, useContext} from 'react';
import './style.css'
import {LoginContext} from '../../LoginContext'
import {useHistory} from 'react-router-dom';
import { socketio } from "../Socket/Socket.io"; /*-- m.p. initialize the socketio --*/


const axios = require('axios');


function LoginPage(props) {
    //for global context
    const [ userEmail, setUserEmail ] = useContext( LoginContext );
    //loval state
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    //used to redirect Route
    const history = useHistory();

    //when user signs in, checks credentials, either reports error, or updates global context and routes user to home
    async function signIn(e) {
        e.preventDefault();
        // console.log('searching db for user', email, 'with password', password );
        
        const loginCredentials = {
            email : email,
            password : password
        }
        // route for server to check credentials
        const response = await axios.post( '/api/checkUser', loginCredentials );
        console.log('response', response );

        if ( response.data === 'success' ){
           alert( 'login successful' );
           setUserEmail( email ); 
           openSocket( email ); /*-- m.p. socketio --*/
           localStorage.setItem('userEmail', JSON.stringify( email ));
           sessionStorage.setItem('userEmail', JSON.stringify( email ));
           history.push("/home")
        } else {
            alert( 'wrong email/password')
        }
    }

    /*-- m.p. socketio --*/
    function openSocket(user){ 
        console.log("open socket called");
        socketio.emit('Login', user, function(data){
            if (data){ console.log(`${user} added into pool.`);} 
            else{ console.log(`${user} is already in pool.`); }
        });
    }


    return(
        <header className="header">
            <div className='row' id='headerRow'>
                <h1 className='col-4' id='title'>Goal Tracker</h1 >
                <div className='col-4'></div >
                <form className='col-4'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='form-control' id='email' placeholder='email' />
                            </div>
                        <div className='col-md-4'>
                            <input type="text" value={password} onChange={e => setPassword(e.target.value)} className='form-control' id='password' placeholder='password'/>
                        </div>
                        <div className='col-4'>
                            <button  value="Submit" onClick={signIn} className="btn btn-primary"id='login-Btn'>Login</button>
                        </div>
                    </div>
                </form >
            </div>
        </header>
    )
}


export default LoginPage;