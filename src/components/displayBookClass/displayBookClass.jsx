import react , { Component } from 'react';

export default class DisplayBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openSnack: false,
          msgSnack: null,
        };
      }

       handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

      componentDidMount(){
          console.log("component mounted");
      }

     addProduct = (book, index) => {
        let values = {
            product_id: book._id
        }
        console.log(book._id);
        services.addToCart(values, book._id).then((res) => {
            console.log(res);
            setMsgSnack("Added to cart");
            setOpenSnack(true);
        })
            .catch((err) => {
                console.log(err);
                setMsgSnack("Please try after some times");
                setOpenSnack(true);
            })
    }

     addWishlist = (book, index) => {
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


    render() {
        return (
            <>
            <div className="bookContain" >
                <div className="addBookBtn"  >
                    <h2 id="books" >Books ({this.props.books.length}) </h2>
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
                    {this.props.books.map((book, index) => (
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
}