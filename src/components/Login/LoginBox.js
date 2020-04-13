import React from 'react';
import './style.css'

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    handleEmailChange = (event) => {
        this.setState({ email : event.target.value })
    }
    handlePasswordChange = (event) => {
        this.setState({ password : event.target.value })
    }
    showInput = () => {
        console.log('this is input function')

    }

    render() {
        return(
            <header className="header">
                <div className='row' id='headerRow'>
                    <h1 className='col-4' id='title'>Goal Tracker</h1 >
                    <div className='col-4'></div >
                    <form className='col-4'>
                        <div className='row'>
                            <div className='col-4'>
                                <input type="text" value={this.state.email} onChange={this.handleEmailChange} className='form-control' id='email' placeholder='email' />
                                </div>
                            <div className='col-4'>
                                <input type="text" value={this.state.password} onChange={this.handlePasswordChange} className='form-control' id='password' placeholder='password'/>
                            </div>
                            <div className='col-4'>
                                <button type="submit" value="Submit" onClick={this.showInput} id='login-Btn'>Login</button>
                            </div>
                        </div>
                    </form >
                </div>
            </header>
        )
    }
}

export default LoginPage;