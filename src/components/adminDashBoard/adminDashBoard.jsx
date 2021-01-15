import React, {useState , useEffect} from 'react';
import AddBook from '../addBook/addBook';
import DisplayBook from '../displayBooks/displayBooks';
import NavBar from '../navBar/navBar';
const services = require('../../services/admin_service');

const AdminDashBoard = () => {
    const [books , setBooks ] = useState([]);
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
    return (
        <>
        <NavBar />
        <DisplayBook books={books} getAllBooks={getAllBooks} open={handleClickOpen} />
        <AddBook open={handleClickOpen} close={handleClose} openState={open} getAllBooks={getAllBooks} />
        </>
    )
}
export default AdminDashBoard;