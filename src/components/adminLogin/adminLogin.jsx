import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './adminLogin.scss';
import education from '../../assets/education.svg';
import NavBar from '../navBar/navBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const services = require('../../services/admin_service');

const regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const regexPassword = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);

const AdminLogin = (props) => {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");

  const emailValidate = (value) => {
    const email = value;
    if (!regexEmail.test(email)) {
      console.log("not match");
      setEmailError("Email is Invalid");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }
  const emailChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
    emailValidate(event.target.value);
  }
  const pswdValidate = (value) => {
    const pswd = value;
    if (!regexPassword.test(pswd)) {
      console.log('pswd not match');
      setPswdError("password not valid");
      return false;
    } else {
      setPswdError("");
      return true;
    }
  }
  const pswdChange = (event) => {
    setPswd(event.target.value);
    pswdValidate(event.target.value);
  }
  const login = () => {
    emailValidate(email);
    pswdValidate(pswd);
    let values = {
      service: "advance",
      email: email,
      password: pswd,
    }
    if (
      emailValidate(email) && pswdValidate(pswd)
    )
      services.login(values).then((res) => {
        console.log(res);
        console.log(res.data.result.accessToken);
        localStorage.setItem("token", res.data.result.accessToken);
        props.history.push('/admindashboard')
      })
        .catch((err) => {
          console.log(err);
          alert("give correct email and password");
        })
  }
  return (
    <div className="wholeContainer">
      <div className="login-container" >
        <Grid>
          <Paper className='gridBox'>
            <div id="header">
              <img src={education} alt="bookstore" />
              <p>Bookstore</p>
            </div>
            <p id="signIn" >Sign In</p>
            <span id="continue">Admin Login</span>
            <div className="inputArea">
              <form className="" noValidate autoComplete="off">
                <TextField className="inputValue" id="outlined-size-normal" name="email" error={emailError.length !== 0} helperText={emailError} onChange={emailChange} value={email} label="Email" fullWidth variant="outlined" size="medium" />
                <TextField className="passwd" id="outlined-size-normal" name="pswd" error={pswdError.length !== 0} onChange={pswdChange} helperText={pswdError} value={pswd} label="Password" type="password" variant="outlined" size="medium" />
              </form>
            </div>
            <div className="last" >
              <Button variant="contained" id="button" onClick={login} >Login</Button>
            </div>
          </Paper>
        </Grid>
      </div>
    </div>
  )
};
export default withRouter(AdminLogin);