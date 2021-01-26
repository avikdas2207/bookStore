import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './userLogin.scss';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import login from '../../assets/login.png';
const services = require('../../services/user_service');

const regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const regexPassword = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);

const UserLogin = (props) => {
  const [show, setShow] = React.useState(true);
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [name, setName] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [pswdReg, setPswdReg] = useState("");
  const [phone, setPhone] = useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState("");

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

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
  const nameChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  }
  const emailRegChange = (event) => {
    setEmailReg(event.target.value);
    console.log(event.target.value);
  }
  const pswdRegChange = (event) => {
    setPswdReg(event.target.value);
    console.log(event.target.value);
  }
  const phoneChange = (event) => {
    setPhone(event.target.value);
    console.log(event.target.value);
  }

  const userLogin = () => {
    emailValidate(email);
    pswdValidate(pswd);
    let values = {
      email: email,
      password: pswd,
    }
    if (
      emailValidate(email) && pswdValidate(pswd)
    )
      services.userLogin(values).then((res) => {
        console.log(res);
        setMsgSnack("Login Successful");
        setOpenSnack(true);
        localStorage.setItem("token", res.data.result.accessToken);
        props.history.push("/dashboard/displaybooks");
        props.close();
      })
        .catch((err) => {
          console.log(err);
          setMsgSnack("Give Correct E-mail and Password");
        setOpenSnack(true);
        setEmail("");
        setPswd("");
        })
  }
  const userReg = () => {
    let values = {
      fullName : name,
      email: emailReg,
      password : pswdReg,
      phone : phone
    }
    console.log(values);
    if (
      name !== null && emailReg !== null && pswdReg !== null && phone !== null
    )
      services.userReg(values).then((res) => {
        console.log(res);
        console.log(res.data.result.accessToken);
        localStorage.setItem("token", res.data.result.accessToken);
        setMsgSnack("Registration Successful");
        setOpenSnack(true);
      })
        .catch((err) => {
          console.log(err);
          setMsgSnack("Give Correct Details");
        setOpenSnack(true);
        })
  }
  return (
    <>
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title" id="loginDialog">
        <div className="dialogContainer">
          <div className="imageArea" >
            <img id="loginImage" src={login} alt="login" />
            <p id="online" >ONLINE BOOK SHOPPING</p>
          </div>
          <div className="loginArea">
            <div className="selectAction" >
              <Button id="selectBtn" onClick={() => setShow(true)} >LOGIN</Button>
              <Button id="selectBtn" onClick={() => setShow(false)} >SIGN UP</Button>
            </div>
            <div>
              {show ?
                <div className="inputArea" >
                  <p id="emailLable" >Email</p>
                  <input id="email" error={emailError.length !== 0} helperText={emailError} onChange={emailChange} value={email} />
                  <p id="pswdLable" >Password</p>
                  <input type="password" id="pswd" error={pswdError.length !== 0} onChange={pswdChange} helperText={pswdError} value={pswd} />
                  <p id="frgtPswd" >Forget Password ?</p>
                  <Button id="loginButton" onClick={userLogin} >Login</Button>
                </div> : <div className="register" >
                  <p id="nameLable" >Full Name</p>
                  <input id="name" onChange={nameChange} value={name} />
                  <p id="emailLable" >Email</p>
                  <input id="email" onChange={emailRegChange} value={emailReg} />
                  <p id="pswdLable" >Password</p>
                  <input id="pswd" onChange={pswdRegChange} value={pswdReg} />
                  <p id="phoneLable" >Mobile Number</p>
                  <input id="phone" onChange={phoneChange} value={phone} />
                  <Button id="loginButton" onClick={userReg} >Sign Up</Button>
                </div>
              }
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message={msgSnack}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnack}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
    </>
  );
}
export default withRouter(UserLogin) ;