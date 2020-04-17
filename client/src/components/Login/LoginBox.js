import React, { useContext } from 'react';
//import { useHistory } from "react-router-dom";
import './style.css';




const axios = require('axios')

class LoginPage extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    
    signIn = async (e) => {
        e.preventDefault();
        //const history = useHistory();
        console.log('searching db for user');

        const loginCredentials = {
            email: this.state.email,
            password: this.state.password
        }
        
       
        const response = await axios.post('/api/checkUser/', loginCredentials)
        console.log('response', response);
        if (response.status === 200) {
            console.log(response.data);
            
            if (loginCredentials.password === response.data.password) {
                alert('user logined');
                localStorage.setItem('user',JSON.stringify(response.data));
              //  history.push("/home");
            }
            else {
                alert('sorry please enter right email and password');
            }
        }
        else {
            console.log(`[sorry no user found]`);
        }
    }

    render() {
        return (
            <header className="header">
                <div className='row' id='headerRow'>
                    <h1 className='col-4' id='title'>Goal Tracker</h1 >
                    <div className='col-4'></div >
                    <form className='col-4'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <input type="text" value={this.state.email} onChange={this.handleEmailChange} className='form-control' id='email' placeholder='email' />
                            </div>
                            <div className='col-md-4'>
                                <input type="text" value={this.state.password} onChange={this.handlePasswordChange} className='form-control' id='password' placeholder='password' />
                            </div>
                            <div className='col-4'>
                                <button type="submit" value="Submit" onClick={this.signIn} className="btn btn-primary" id='login-Btn'>Login</button>
                            </div>
                        </div>
                    </form >
                </div>
            </header>
        )
    }
}

export default LoginPage;