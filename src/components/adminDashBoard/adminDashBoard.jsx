import React, { useState, useEffect } from 'react';
import AddBook from '../addBook/addBook';
import UpdateBook from '../updateBook/updateBook';
import DisplayBook from '../displayBooks/displayBooks';
import NavBar from '../navBar/navBar';
const services = require('../../services/admin_service');

const AdminDashBoard = (props) => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    getAllBooks();
  }, [])
  const getAllBooks = () => {
    console.log("book calling");
    services.getAllBooks().then((res) => {
      console.log(res);
      console.log(res.data.result);
      setBooks(res.data.result);
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const deleteBook = (book) => {
    console.log("book calling");
    services.deleteBooks(book).then((res) => {
      console.log(res);
      getAllBooks();
    })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <NavBar />
      <DisplayBook books={books} getAllBooks={getAllBooks} open={handleClickOpen} delete={deleteBook} />
      <AddBook open={handleClickOpen} close={handleClose} openState={open} getAllBooks={getAllBooks} />
      {/* <UpdateBook openUpdate={handleClickOpenUpdate} closeUpdate={handleCloseUpdate} openStateUpdate={openUpdate} getAllBooks={getAllBooks} /> */}
    </>
  )
}
export default AdminDashBoard;