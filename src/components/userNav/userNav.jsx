import React , { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import education from '../../assets/education.svg';
import './userNav.scss';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CardTravelOutlinedIcon from '@material-ui/icons/CardTravelOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Divider from '@material-ui/core/Divider';
import UserLogin from '../userLogin/userLogin';
import AddCart from '../addCart/addCart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const UserNavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [msgSnack, setMsgSnack] = React.useState("");

  useEffect(() => {
    props.getCart();
  }, [])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const openCart = () => {
    (localStorage.getItem("token")) ? props.history.push('/dashboard/mycart') : loginAlert();
  }

  const loginAlert = () => {
    setMsgSnack("Login First");
    setOpenSnack(true);
  }

  const openDash = () => {
    props.history.push('/dashboard/displaybooks');
  }
  const goWishlist = () => {
    props.history.push('/dashboard/mywishlist');
  }

  const logOut = () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    console.log(token);
    props.history.push('/dashboard/displaybooks');
  }

  const onCLickLogout = () => {
    logOut();
    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      id="drop"
    >
      { (localStorage.getItem("token") == null) ? <div id="beforeLogin">
        <p id="first" className="firstPara" >Welcome</p>
        <p id="second" >To access account and manage orders</p>
        <Button onClick={handleClickOpen} > Login/SignUp </Button>
        <div id="getProducts" >
          <div id="myOrders" >
            <CardTravelOutlinedIcon id="travel" />
            <p id="orderText" >My Orders</p>
          </div>
          <div id="myWishlist" onClick={goWishlist} >
            <FavoriteBorderOutlinedIcon id="wish" />
            <p id="wishText" >WishList</p>
          </div>
        </div>
      </div> : <div id="afterLogin" > <p id="first" className="firstPara" >Welcome</p>
        <p id="second" >To access account and manage orders</p> < Button onClick={logOut} id="logoutBtn" > Logout </ Button> <div id="getProducts" >
        <div id="myOrders" >
          <CardTravelOutlinedIcon id="travel" />
          <p id="orderText" >My Orders</p>
        </div>
        <div id="myWishlist" onClick={goWishlist} >
          <FavoriteBorderOutlinedIcon id="wish" />
          <p id="wishText" >WishList</p>
        </div>
      </div> </div>}

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen} >
        <IconButton aria-label="show 4 new mails" color="inherit" id="accountRes">
        <AccountCircle />
        </IconButton>
        <p id="accountPara">Account</p>
      </MenuItem>
      <MenuItem onClick={openCart}>
        <IconButton aria-label="show 11 new notifications" color="inherit" id="cartRes" >
        <Badge badgeContent={props.length} color="secondary">
                <ShoppingCartOutlinedIcon />
                </Badge>
        </IconButton>
        <p id="cartPara" > Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow} id="appBar" >
        <AppBar position="static">
          <Toolbar>
            <img src={education} alt="bookstore" onClick={openDash} />
            <Typography className={classes.title} id="lableName" variant="h6" noWrap>
              Bookstore
          </Typography>
            <div className={classes.search} id="wholeSearch" >
              <div className={classes.searchIcon}>
                <SearchIcon id="searchIcon" />
              </div>
              <InputBase id="searchBar"
                placeholder="Search…" onChange={event => {props.setSearchTerm(event.target.value)}}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton onClick={openCart} >
                <Badge badgeContent={props.length} color="secondary">
                <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <UserLogin open={open} close={handleClose} openLogin={handleClickOpen} />
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
  );
}
export default withRouter(UserNavBar);