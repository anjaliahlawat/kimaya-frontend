import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from '../../services/authService';

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
  return (
    <Route
        {...rest}
        render = {props => {
            const {userName} = getUser()
            if(!userName) 
                return <Redirect to='/login' />
            return Component ? <Component {...props} /> : render(props)
        }}
    />
  );
}

export default ProtectedRoute;