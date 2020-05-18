import React, {useState} from "react";
import LoginBox from './LoginBox';
import SignUpBox from './SignUpBox';


function LoginPage( props ){
   const empty = {
       height:'300px',
       bottom:'0px'
   }

    return (
        <div>
            <LoginBox />
            <SignUpBox />
        </div>
    )
}

export default LoginPage;