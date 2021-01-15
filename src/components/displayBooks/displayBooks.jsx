import React, { useState, useEffect } from 'react';
import './displayBooks.scss';
import Card from '@material-ui/core/Card';
import NoImage from '../../assets/NoImage.jpg';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const DisplayBook = (props) => {


    return (
        <div className="bookContain" >
            <div className="addBookBtn" onClick={props.open} >
                <h2>Books</h2>
                <Button variant="outlined" color="primary">
                    Add Book
                </Button>
            </div>
            <div className="displayCard" >
                {props.books.map((book) => (
                    <Card key={book.id} >
                        <CardContent id="imageCard" >
                            <div id="imageContain">
                                <img src={NoImage} alt="noImage" id="noImage" />
                            </div>
                            </CardContent >
                            <CardContent id="detailsCard" >
                            <p id="name" >{book.bookName}</p>
                            <p id="author" >{book.author}</p>
                            <p id="price" >Rs. {book.price}</p>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DisplayBook;

