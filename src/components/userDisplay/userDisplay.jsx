import React, { useState, useEffect } from 'react';
import './userDisplay.scss';
import Pagination from './pagination';
import Card from '@material-ui/core/Card';
import NoImage from '../../assets/NoImage.jpg';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
const services = require('../../services/user_service');


const UserDisplay = (props) => {

    const [shift, setShift] = useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [msgSnack, setMsgSnack] = React.useState("");
    const [ sortType , setSortType ] = React.useState("asc");
    const [ currentPage , setCurrentPage ] = useState(1);
    const [ booksPerPage , setBooksPerPage ] = useState(8);

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const addProduct = (book, index) => {
        props.bookAdded(index);
        let values = {
            product_id: book._id
        }
        console.log(book._id);
        services.addToCart(values, book._id).then((res) => {
            console.log(res);
            setShift(true);
            setMsgSnack("Added to cart");
            setOpenSnack(true);
        })
            .catch((err) => {
                console.log(err);
                setMsgSnack("Please try after some times");
                setOpenSnack(true);
            })
    }

    const addWishlist = (book, index) => {
        props.bookWishlist(index);
        let values = {
            product_id: book._id
        }
        console.log(book._id);
        services.addToWishlist(values, book._id).then((res) => {
            console.log(res);
            setMsgSnack("Added to WishList");
            setOpenSnack(true);
        })
            .catch((err) => {
                console.log(err);
                setMsgSnack("Please try after sometimes");
                setOpenSnack(true);
            })
    }

    const indexOfLastPost = currentPage * booksPerPage;
    const indexOfFirstPost = indexOfLastPost - booksPerPage;
    const currentPosts = props.books.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <div className="bookContain" >
                <div className="addBookBtn"  >
                    <h2 id="books" >Books ({props.books.length}) </h2>
                    <FormControl>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em> Sort by Relevance</em>
                            </MenuItem>
                            <MenuItem >Sort by Ascending</MenuItem>
                            <MenuItem >Sort by Ascending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="displayCard" >
                    {currentPosts.filter((book) => {
                        if (props.searchTerm == "") {
                            return book
                        } else if (book.bookName.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                            return book
                        }
                    }).map((book, index) => (
                        <Card key={index} >
                            <CardContent id="imageCard" >
                                <div id="imageContain">
                                    {(index % 2 == 0) ? <img src={book1} alt="noImage" id="noImage" /> : <img src={book2} alt="noImage" id="noImage" />}
                                </div>
                            </CardContent >
                            <CardContent id="detailsCard" >
                                <p id="name" >{book.bookName}</p>
                                <p id="author" >{book.author}</p>
                                <p id="price" >Rs. {book.price}</p>
                                {/* {book.isAdded == true ? <div className="btnContainer">
                                    <Button id="updateDone" variant="contained" onClick={() => addProduct(book,index)} >ADDED </Button>
                                    <Button id="delete" variant="outlined" onClick={() => addWishlist(book)} className="blackFont" >WISHLIST</Button>
                                </div> : <div className="btnContainer">
                                    <Button id="update" variant="contained" onClick={() => addProduct(book,index)} >ADD TO BAG</Button>
                                    <Button id="delete" variant="outlined" onClick={() => addWishlist(book)} className="blackFont" >WISHLIST</Button>
                                </div> } */}

                                <div className="btnContainer">
                                    {book.isAdded == true ? <Button id="updateDone" variant="contained" onClick={() => addProduct(book, index)} >ADDED </Button> :
                                        <Button id="update" variant="contained" onClick={() => addProduct(book, index)} >ADD TO BAG</Button>}
                                    {book.isWishlisted == true ? <Button id="deleteDone" variant="outlined" onClick={() => addWishlist(book, index)} className="blackFont" >WISHLISTED</Button> :
                                        <Button id="delete" variant="outlined" onClick={() => addWishlist(book, index)} className="blackFont" >WISHLIST</Button>}
                                </div>

                            </CardContent>

                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <Pagination booksPerPage={booksPerPage} totalBooks={props.books.length} paginate={paginate} />
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

export default UserDisplay;

