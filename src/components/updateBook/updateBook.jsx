import React, { useState , useEffect } from 'react';
import './updateBook.scss';
import education from '../../assets/education.svg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const services = require('../../services/admin_service');

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const UpdateBook = (props) => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [disPrice, setDisPrice] = useState("");
    const [ bookId, setBookId ] = useState("");
    console.log("book details",props.book);
    
    useEffect(()=>{
        setName(props.book ? props.book.bookName : "");
        setAuthor(props.book ? props.book.author : "");
        setDesc(props.book ? props.book.description : "");
        setQuantity(props.book ? props.book.quantity : "");
        setPrice(props.book ? props.book.price : "");
        setDisPrice(props.book ? props.book.discountPrice : "");
        setBookId(props.book ? props.book._id : "");
    },[props.book])

    const nameChange = (event) => {
        let name = event.target.value;
        console.log(name);
        if (name !== 0) {
            setName(name);
        }
    }
    const authorChange = (event) => {
        let author = event.target.value;
        console.log(author);
        if (author !== 0) {
            setAuthor(author);
        }
    }
    const descChange = (event) => {
        let desc = event.target.value;
        console.log(desc);
        if (desc !== 0) {
            setDesc(desc);
        }
    }
    const quantityChange = (event) => {
        let quantity = Number(event.target.value);
        console.log(quantity);
        if (quantity !== 0) {
            setQuantity(quantity);
        }
    }
    const priceChange = (event) => {
        let price = Number(event.target.value);
        console.log(price);
        if (price !== 0) {
            setPrice(price);
        }
    }
    const disPriceChange = (event) => {
        let disPrice = Number(event.target.value);
        console.log(disPrice);
        if (disPrice !== 0) {
            setDisPrice(disPrice);
        }
    }
    const updateBook = () => {
        console.log("calling api");
        let values = {
            bookName: name,
            author: author,
            description: desc,
            quantity: quantity,
            price: price,
            discountPrice: disPrice,    
        };
        services.updateBooks(values,props.book._id).then((res) => {
            console.log(res);
            props.getAllBooks();
        })
            .catch((err) => {
                console.log(err);
                alert("All Feilds are Required")
            })
    }
    const onClick = () => {
        console.log("onCLick");
        updateBook();
        props.closeUpdate();
    }
    return (
        <div className="addBookDialog">
            <Dialog onClose={props.closeUpdate} aria-labelledby="customized-dialog-title" open={props.openStateUpdate}>
                <DialogTitle id="customized-dialog-title" onClose={props.closeUpdate} className="titleBar" >
                    <img src={education} alt="logo" id="logo" />
          Update Book
        </DialogTitle>
                <DialogContent dividers>
                    <form id="addBookForm">
                        <TextField
                            label="Book Name"
                            variant="outlined"
                            value={name}
                            size="small"
                            onChange={nameChange}
                        />
                        <TextField
                            label="Author"
                            variant="outlined"
                            value={author}
                            size="small"
                            onChange={authorChange}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={desc}
                            size="small"
                            onChange={descChange}
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            value={quantity}
                            size="small"
                            type="number"
                            onChange={quantityChange}
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            value={price}
                            size="small"
                            type="number"
                            onChange={priceChange}
                        />
                        <TextField
                            label="Discount Price"
                            variant="outlined"
                            value={disPrice}
                            size="small"
                            type="number"
                            onChange={disPriceChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onClick} color="primary">
                        Update Book
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default UpdateBook;