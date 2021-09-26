import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component,role, ...rest}) => {
    console.log(role)
  
    let action=false   
    
    if(action===false){
        if(role===localStorage.getItem('UserRole')){
            action=true
        }else{
            action=false
        }
    }
    const LoginAuth=()=>{
        if(localStorage.getItem('Token')){
            return true
        }else{
            return false
        }
    }
    
    return (
        <Route {...rest} render={props => (
            LoginAuth() ?
            action===true?
                <Component {...props} /> : <Redirect to="/user-deshboard" />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;