import React, { useState, useEffect } from 'react';
import './displayBooks.scss';
import Card from '@material-ui/core/Card';
import NoImage from '../../assets/NoImage.jpg';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UpdateBook from '../updateBook/updateBook';

const DisplayBook = (props) => {
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [bookDetails , setBookDetails ] = React.useState({});

    const handleClickOpenUpdate = (book) => {
        setOpenUpdate(true);
        setBookDetails(book);
      };
      const handleCloseUpdate = () => {
        setOpenUpdate(false);
      };

    return (
        <>
        <div className="bookContain" >
            <div className="addBookBtn"  >
                <h2>Books</h2>
                <Button variant="outlined" onClick={props.open} id="addBook" color="primary">
                    Add Book
                </Button>
            </div>
            <div className="displayCard" >
                {props.books.map((book) => (
                    <Card key={book._id} >
                        <CardContent id="imageCard" >
                            <div id="imageContain">
                                <img src={NoImage} alt="noImage" id="noImage" />
                            </div>
                        </CardContent >
                        <CardContent id="detailsCard" >
                            <p id="name" >{book.bookName}</p>
                            <p id="author" >{book.author}</p>
                            <p id="price" >Rs. {book.price}</p>
                            <div className="btnContainer">
                            <Button id="update" variant="contained" onClick={() => handleClickOpenUpdate(book)} >Update</Button>
                            <Button id="delete" variant="outlined" className="blackFont" onClick={() => props.delete(book)} >Delete</Button>
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
        <UpdateBook book={bookDetails} openStateUpdate={openUpdate} closeUpdate={handleCloseUpdate} />
        </>
    )
}

export default DisplayBook;

