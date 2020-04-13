import React from 'react';

class SignUp extends React.Component{
    render() {
        return(
            <div className='container' id='signUpForm'>
                <h2> Sign Up</h2>
                <hr/>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label for="inputFirstName">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" placeholder="Chris"/>
                        </div>
                        <div className="form-group col-md-6">
                        <label for="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Smith"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="chrissmith@gmail.com"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder=""/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword2">Confirm Password</label>
                            <input type="password" className="form-control" id="inputPassword2" placeholder=""/>
                        </div>
                    </div>
                    <button  className="btn btn-primary" id="signUp-Btn">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;