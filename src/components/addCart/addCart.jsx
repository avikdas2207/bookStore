import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './addCart.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const services = require('../../services/user_service');

const phoneRegex = new RegExp(/^[6-9]\d{9}$/);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let sum;

const AddCart = (props) => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(parseInt(1));
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [addressError, setAddressError] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [city, setCity] = React.useState("");
  const [cityError, setCityError] = React.useState("");
  const [stateCity, setStateCity] = React.useState("");
  const [stateCityError, setStateCityError] = React.useState("");
  const [type, setType] = React.useState("Home");
  const [typeError, setTypeError] = React.useState("");


  useEffect(() => {
    getCart();
  }, [])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const getCart = () => {
    services.getCart().then((res) => {
      console.log(res);
      console.log(res.data.result);
      console.log(res.data.result.length);
      setCart(res.data.result);
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const addQuantity = (cart) => {
    console.log(cart.product_id.quantity);
    cart.product_id.quantity = parseInt(cart.product_id.quantity) + parseInt(1);
    console.log(cart.product_id.quantity);
    let sum = cart.product_id.quantity;
    console.log("add", sum);
    let values = {
      quantityToBuy: sum
    }
    services.updateQuantity(cart, values).then((res) => {
      console.log(res);
      getCart();
    })
      .catch((err) => {
        console.log(err);
      })

  }
  const deleteQuantity = (cart) => {
    cart.product_id.quantity = parseInt(cart.product_id.quantity) - parseInt(1);
    console.log(cart.product_id.quantity);
    let del = cart.product_id.quantity;
    console.log("add", del);
    let values = {
      quantityToBuy: del
    }
    services.updateQuantity(cart, values).then((res) => {
      console.log(res);
      getCart();
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const removeProduct = (cart) => {
    services.deleteProduct(cart).then((res) => {
      console.log(res);
      setMsgSnack("Product Removed");
      setOpenSnack(true);
      getCart();
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const placeOrder = (cart) => {
    console.log(cart);
    validateName(name);
    validatePhone(phone);
    validateAddress(address);
    validateCity(city);
    validateStateCity(stateCity);
    let arr = [];
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      arr.push({
        product_id : element._id,
        product_name : element.product_id.bookName,
        product_quantity : element.product_id.quantity,
        product_price : element.product_id.price
      })
      console.log(element);
    }
    let values = {
      orders : arr
    };
    if ( name == 0 ) {
      setOpenSnack(true);
      setMsgSnack("fill address first");
    } else {
    services.placeOrder(values).then((res) => {
      console.log(res);
      setMsgSnack("Order Placed");
      setOpenSnack(true);
      props.history.push('/dashboard/orderplaced')
    })
      .catch((err) => {
        console.log(err);
        setMsgSnack("User Details not Updated");
      setOpenSnack(true);
      })
    }
    
  }

  const nameChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  }
  const phoneChange = (event) => {
    setPhone(event.target.value);
    console.log(event.target.value);
  }
  const addressChange = (event) => {
    setAddress(event.target.value);
    console.log(event.target.value);
  }
  const cityChange = (event) => {
    setCity(event.target.value);
    console.log(event.target.value);
  }
  const stateCityChange = (event) => {
    setStateCity(event.target.value);
    console.log(event.target.value);
  }
  const typeChange = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  }

  const validatePhone = (phone) => {
    if ( !phoneRegex.test(phone) ) {
      setPhoneError("phone no. not valid");
    } else {
      setPhoneError("");
    }
  }
  const validateName = (name) => {
    if (name.length == 0) {
      setNameError("Name Required");
      return false;
    } else {
      setNameError("");
      return true;
    }
  }
  const validateAddress = (address) => {
    if (address.length == 0) {
      setAddressError("Address Required");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  } 
  const validateCity = (city) => {
    if (city.length == 0) {
      setCityError("City Required");
      return false;
    } else {
      setCityError("");
      return true;
    }
  }
  const validateStateCity = (stateCity) => {
    if (stateCity.length == 0) {
      setStateCityError("State Required");
      return false;
    } else {
      setStateCityError("");
      return true;
    }
  }

  const updateUser = () => {
    validateName(name);
    validatePhone(phone);
    validateAddress(address);
    validateCity(city);
    validateStateCity(stateCity);

    let values = {
      addressType : type ,
      fullAddress : address,
      city : city,
      state : stateCity
    };
    if ( validateName(name) && validateAddress(address) )
    services.updateAddress(values).then((res) => {
      console.log(res);
      setMsgSnack("User Details Updated");
      setOpenSnack(true);
      getCart();
    })
      .catch((err) => {
        console.log(err);
        setMsgSnack("User Details not Updated");
      setOpenSnack(true);
      })
  }


  return (
    <>
      <div className="cartContainer" >
        <Card >
          <CardContent>
            <div id="headerCart">
              <p id="myCart">My Cart</p>
            </div>
            <div id="bookArea">
              {
                cart.map((cart, index) => (
                  <div key={index} id="eachProduct" >
                    <div id="imageContain">
                      {(index % 2 == 0) ? <img src={book1} alt="noImage" id="noImage" /> : <img src={book2} alt="noImage" id="noImage" />}
                    </div>
                    <div id="detailsArea" >
                      <p id="bookName"> {cart.product_id.bookName} </p>
                      <p id="author"> by {cart.product_id.author} </p>
                      <div id="priceDetail" >
                        <p id="price"> Rs. {cart.product_id.price}</p>
                        <p id="disPrice" > Rs. {cart.product_id.discountPrice}</p>
                      </div>
                      <div id="lastPart">
                        <div id="quantitySelect" >
                          <AddCircleOutlineOutlinedIcon onClick={() => addQuantity(cart)} />
                          <input value={cart.product_id.quantity} disabled id="displayValue" />
                          <RemoveCircleOutlineOutlinedIcon onClick={() => deleteQuantity(cart)} />
                        </div>
                        <div id="removeBtn">
                          <Button id="remove" onClick={() => removeProduct(cart)} size="small">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>

          </CardContent>
        </Card>
      </div>
      <div className="secondBox">
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p id="addPara">Address Details</p>
          </AccordionSummary>
          <AccordionDetails>
            <div id="userDetails">
              <div id="firstRow">
              <TextField id="name" className="inputValue" id="outlined-size-normal" name="name" error={nameError.length !== 0} onChange={nameChange}
                 value={name} helperText={nameError} label="Full Name" variant="outlined" size="small" />
              <TextField className="inputValue" id="outlined-size-normal" name="phone" error={phoneError.length !== 0}
                helperText={phoneError} onChange={phoneChange} value={phone} label="Phone" variant="outlined" size="small" />
                </div>
              <TextField className="inputValue" id="outlined-size-normal" name="address" error={addressError.length !== 0}
                 onChange={addressChange} value={address} helperText={addressError} label="Address" fullWidth variant="outlined" size="large" />
                 <div id="secondRow" >
              <TextField className="inputValue" id="outlined-size-normal" name="city" error={cityError.length !== 0} helperText={cityError}
                 onChange={cityChange} value={city} label="City" variant="outlined" size="small" />
              <TextField className="inputValue" id="outlined-size-normal" name="state" error={stateCityError.length !== 0}
                 onChange={stateCityChange} helperText={stateCityError} value={stateCity} label="State" variant="outlined" size="small" />
                 </div>
                 <div id="lastRow" >
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type" value={type} onChange={typeChange}>
                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                  <FormControlLabel value="Office" control={<Radio />} label="Work" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
              </div>
              
            </div>
            <div id="addBtn">
              <Button id="addressBtn" onClick={updateUser} >Address Details</Button>
              </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="thirdBox">
        <Card>
          <CardContent >
            <div className="orderContainer" >
            <div id="orderCart">
              <p id="orderCart">Order Summary</p>
            </div>
            <div id="orderArea">
              {
                cart.map((cart, index) => (
                  <div key={index} id="eachProduct" >
                    <div id="imageContain">
                      {(index % 2 == 0) ? <img src={book1} alt="noImage" id="noImage" /> : <img src={book2} alt="noImage" id="noImage" />}
                    </div>
                    <div id="detailsArea" >
                      <p id="bookName"> {cart.product_id.bookName} </p>
                      <p id="author"> by {cart.product_id.author} </p>
                      <div id="priceDetail" >
                        <p id="price"> Rs. {cart.product_id.price}</p>
                        <p id="disPrice" > Rs. {cart.product_id.discountPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}

            </div>
            </div>

          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => placeOrder(cart)} >Place Order</Button>
          </CardActions>
        </Card>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
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
  )
}
export default withRouter(AddCart) ;