import React, { useState, useEffect } from 'react';
import { withRouter , Route , Link  } from 'react-router-dom';
import './userDashboard.scss';
import UserNavBar from '../userNav/userNav';
import UserDisplay from '../userDisplay/userDisplay';
import AddCart from '../addCart/addCart';
import AddWishlist from '../addWishlist/addWishlist';
import OrderPlaced from '../orderPlaced/orderPlaced';
const services = require('../../services/user_service');

const UserDashBoard = () => {
  const [books, setBooks] = useState([]);
  const [ length , setLength ] = useState([]);
  const [ searchTerm , setSearchTerm ] = useState([]);
  
  useEffect(() => {
    getAllBooks();
    getCart();
  }, [] )

  console.log(searchTerm);

  const bookAdded = (index) => {
    let tempArray = [...books];
    tempArray[index]["isAdded"] = true;
    console.log(tempArray[index]);
    setBooks(tempArray);
  }
  const bookWishlist = (index) => {
    let tempArray = [...books];
    tempArray[index]["isWishlisted"] = true;
    console.log(tempArray[index]);
    setBooks(tempArray);
  }
  const getAllBooks = () => {
    console.log("book calling");
    services.getAllBooks().then((res) => {
      console.log(res);
      console.log(res.data.result);
      console.log(res.data.result.index);
      setBooks(res.data.result);
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const getCart = () => {
    services.getCart().then((res) => {
      setLength(res.data.result.length);
    })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
    <Route path="/dashboard/displaybooks" >
      <UserNavBar length={length} getCart={getCart} setSearchTerm={setSearchTerm} />
      <UserDisplay books={books} bookAdded={bookAdded} searchTerm={searchTerm} bookWishlist={bookWishlist} />
      </Route>
      <Route path="/dashboard/mycart">
        <UserNavBar length={length} getCart={getCart} />
      <AddCart />
      </Route>
      <Route path="/dashboard/mywishlist">
        <UserNavBar length={length} getCart={getCart} />
      <AddWishlist />
      </Route>
      <Route path="/dashboard/orderplaced">
        <UserNavBar length={length} getCart={getCart} />
      <OrderPlaced />
      </Route>
    </>
  )
}
export default UserDashBoard;