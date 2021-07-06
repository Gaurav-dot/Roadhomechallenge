import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Firebase from '../services/firebase';

const ProtectRoute: React.FC<RouteProps> = (props) => {
  var isAuthenticated = !!Firebase.auth().currentUser;
  return isAuthenticated ? <Route {...props} component={props.component} /> : <Redirect to="/" />;
};

export default ProtectRoute;