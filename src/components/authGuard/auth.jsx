import react from 'react';
import { Redirect , Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component,...rest  }) => (
    <Route {...rest} render={props => localStorage.getItem("token") ? ( <Component {...props} /> ) : (<Redirect to={{pathname: "/adminlogin" }} />)}
     /> )

     export default PrivateRoute;