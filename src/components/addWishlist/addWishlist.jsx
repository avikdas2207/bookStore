import React, { useState, useEffect } from 'react';
import './addWishlist.scss';
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
import { addToCart } from '../../services/user_service';
const services = require('../../services/user_service');

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

let sum ;

const AddWishlist = () => {
  const [wishList, setWishList] = useState([]);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState("");

  useEffect(() => {
    getWishList();
  }, [])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const getWishList = () => {
    services.getWishList().then((res) => {
      console.log(res);
      console.log(res.data.result);
      setWishList(res.data.result);
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

  
  const removeWishlist = (wishlist) => {
    services.deleteWishList(wishlist).then((res) => {
      console.log(res);
      getWishList();
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const addProduct = (wishlist) => {
    let values = {
        product_id: wishlist._id
    }
    console.log(wishlist._id);
    services.addToCart(values, wishlist._id).then((res) => {
        console.log(res);
        setMsgSnack("Moved to cart");
        setOpenSnack(true);
        getWishList();
    })
        .catch((err) => {
            console.log(err);
            alert("not added");
            setMsgSnack("Please try after some times");
            setOpenSnack(true);
        })
}

  return (
    <>
      <div className="wishContainer" >
        <Card >
          <CardContent>
            <div id="headerCart">
              <p id="myCart">My WishList</p>
            </div>
            <div id="bookArea">
              {
                wishList.map((wishlist, index) => (
                  <div key={index} id="eachProduct" >
                    <div id="imageContain">
                      {(index % 2 == 0) ? <img src={book1} alt="noImage" id="noImage" /> : <img src={book2} alt="noImage" id="noImage" />}
                    </div>
                    <div id="detailsArea" >
                      <p id="bookName"> {wishlist.product_id.bookName} </p>
                      <p id="author"> by {wishlist.product_id.author} </p>
                      <div id="priceDetail" >
                        <p id="price"> Rs. {wishlist.product_id.price}</p>
                        <p id="disPrice" > Rs. {wishlist.product_id.discountPrice}</p>
                      </div>
                      <div id="lastPart">
                          <Button id="moveToCart" onClick={() => addProduct(wishlist)} >Move To Cart</Button>
                        <div id="removeBtn">
                          <Button id="remove" onClick={() => removeWishlist(wishlist)} size="small">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            </div>

          </CardContent>
        </Card>
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
  )
}
export default AddWishlist;