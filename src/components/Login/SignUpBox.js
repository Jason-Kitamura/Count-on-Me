import React from 'react';
const axios = require('axios')

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            email: '',
            password1: '',
            password2 : '',
        };
    }
    handleFirstNameChange = (event) => {
        this.setState({ firstName : event.target.value })
    }
    handleLastNameChange = (event) => {
        this.setState({ lastName : event.target.value })
    }
    handleEmailChange = (event) => {
        this.setState({ email : event.target.value })
    }
    handlePassword1Change = (event) => {
        this.setState({ password1 : event.target.value })
    }
    handlePassword2Change = (event) => {
        this.setState({ password2 : event.target.value })
    }
    sendUserInfo = async (e) => {
        e.preventDefault();

        console.log( 'sending data to server...')

        const newUser = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password1
        }
        const createUser = await axios.post( 'http://localhost:5000/api/createUser', newUser)
        console.log('created user', createUser );
     }
        

    render() {
        return(
            <div className='container' id='signUpForm'>
                <h2> Sign Up</h2>
                <hr/>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputFirstName">First Name</label>
                        <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} className="form-control" id="inputFirstName" placeholder="Chris"/>
                        </div>
                        <div className="form-group col-md-6">
                        <label for="inputLastName">Last Name</label>
                        <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange}className="form-control" id="inputLastName" placeholder="Smith"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="inputEmail" placeholder="chrissmith@gmail.com"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputPassword">Password</label>
                            <input type="password" value={this.state.password1} onChange={this.handlePassword1Change}className="form-control" id="inputPassword" placeholder=""/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword2">Confirm Password</label>
                            <input type="password" value={this.state.password2} onChange={this.handlePassword2Change} className="form-control" id="inputPassword2" placeholder=""/>
                        </div>
                    </div>
                    <button onClick={this.sendUserInfo} className="btn btn-primary" id="signUp-Btn">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;