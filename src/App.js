import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/navBar/navBar';
import AdminDashBoard from './components/adminDashBoard/adminDashBoard';
import AdminLogin from './components/adminLogin/adminLogin';
import PrivateRoute from './components/authGuard/auth';
import UserDashBoard from './components/userDash/userDashboard';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

function App() {
  return ( 
  <div className="App" >
     <Router>
        <Switch>
          <ErrorBoundary >
          <Route path="/adminlogin" component={AdminLogin} >
            <AdminLogin />
          </Route>
          <PrivateRoute path="/admindashboard" component={AdminDashBoard} />
          <Route path="/dashboard" component={UserDashBoard} >
            <UserDashBoard />
          </Route>
          </ErrorBoundary>
        </Switch>
      </Router>
  </div> );
    
}

export default App;
