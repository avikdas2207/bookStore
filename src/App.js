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

function App() {
  return ( 
  <div className="App" >
     <Router>
        <Switch>
          <Route path="/admindashboard" component={AdminDashBoard} >
            <AdminDashBoard />
          </Route>
          <Route path="/adminlogin" component={AdminLogin} >
            <AdminLogin />
          </Route>
        </Switch>
      </Router>
  </div> );
    
}

export default App;
