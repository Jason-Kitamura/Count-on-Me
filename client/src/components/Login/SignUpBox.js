import React, {useState, useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios')

toast.configure();

function SignUp() {
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password1, setPassword1 ] = useState('');
    const [password2, setPassword2 ] = useState('');

    async function sendUserInfo(e) {
        e.preventDefault();

        console.log( 'sending data to server...')

        const newUser = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password1
        }
        console.log( 'new user:', newUser );
        if ( password2 !== newUser.password ) {
            toast.error( ' passwords do not match ')
        } else if ( password2 == newUser.password ){
            const createUser = await axios.post( '/api/createUser', newUser);
            console.log('create user response', createUser );

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword1('');
            setPassword2('');

            toast.success(`Created user ${createUser.data.firstName} ${createUser.data.lastName}`, {
                autoClose : 3000
            } );

        }
     }
     return(
        <div className='container' id='signUpForm'>
            <h2> Sign Up</h2>
            <hr/>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName( e.target.value )} className="form-control" id="inputFirstName" placeholder="Chris"/>
                    </div>
                    <div className="form-group col-md-6">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" value={lastName} onChange={e => setLastName( e.target.value )}className="form-control" id="inputLastName" placeholder="Smith"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="inputEmail" placeholder="chrissmith@gmail.com"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputPassword">Password</label>
                        <input type="password" value={password1} onChange={e => setPassword1(e.target.value)}className="form-control" id="inputPassword" placeholder=""/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword2">Confirm Password</label>
                        <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} className="form-control" id="inputPassword2" placeholder=""/>
                    </div>
                </div>
                <button onClick={sendUserInfo} className="btn btn-primary" id="signUp-Btn">Sign Up</button>
            </form>
        </div>
    )
}


export default SignUp;