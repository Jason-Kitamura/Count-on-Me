import React, {useState} from "react";
import LoginBox from './LoginBox';
import SignUpBox from './SignUpBox';


function LoginPage( props ){

    return (
        <>
            <LoginBox />

            <SignUpBox />

        </>
    )
}

export default LoginPage;