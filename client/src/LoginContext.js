import React, { useState, createContext } from 'react'

export const LoginContext = createContext();

export const LoginProvider = props => {

    const [ userEmail, setUserEmail ] = useState('none');
    
    return(
        <LoginContext.Provider value={[userEmail, setUserEmail]}>
            {props.children}
        </LoginContext.Provider>
    );
}