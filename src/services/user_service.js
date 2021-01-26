const axios = require('./axios_service');
var config = require('./config');
class UserService {
    getAllBooks(){
        let url = `${config.url}get/book`;
        return axios.get(url);
    }
    userLogin(value){
        let url = `${config.url}login`;
        return axios.post(url, value);
    }
    userReg(value){
        let url = `${config.url}registration`;
        return axios.post(url, value);
    }
    addToCart(value, product_id){
        let header = {
            headers: {
              'token' : localStorage.getItem("token")
            }
          };
        let url = `${config.url}add_cart_item/${product_id}`;
        console.log(url);
        console.log(header);
        return axios.post(url, value , true , header);
    }
    addToWishlist(value, product_id){
      let header = {
          headers: {
            'token' : localStorage.getItem("token")
          }
        };
      let url = `${config.url}add_wish_list/${product_id}`;
      console.log(url);
      console.log(header);
      return axios.post(url, value , true , header);
  }
    getCart(){
        let header = {
            headers: {
              'token' : localStorage.getItem("token")
            }
          };
        let url = `${config.url}get_cart_items`;
        return axios.get(url, true , header );
    }
    deleteProduct(cart){
      let header = {
          headers: {
            'token' : localStorage.getItem("token")
          }
        };
      let url = `${config.url}remove_cart_item/${cart._id}`;
      return axios.Delete(url, true , header);
  }
  updateQuantity(cart , value ){
    let header = {
      headers: {
        'token' : localStorage.getItem("token")
      }
    };
      let url = `${config.url}cart_item_quantity/${cart._id}`;
      return axios.put(url, value, true , header );
  }
  getWishList(){
    let header = {
        headers: {
          'token' : localStorage.getItem("token")
        }
      };
    let url = `${config.url}get_wishlist_items`;
    return axios.get(url, true , header );
}
deleteWishList(wishlist){
  let header = {
      headers: {
        'token' : localStorage.getItem("token")
      }
    };
  let url = `${config.url}remove_wishlist_item/${wishlist.product_id._id}`;
  return axios.Delete(url, true , header);
}
updateAddress(value ){
  let header = {
    headers: {
      'token' : localStorage.getItem("token")
    }
  };
    let url = `${config.url}edit_user`;
    return axios.put(url, value, true , header );
}
placeOrder(value) {
  let header = {
    headers: {
      'token' : localStorage.getItem("token")
    }
  };
let url = `${config.url}add/order`;
console.log(url);
console.log(header);
return axios.post(url, value , true , header);
}
}
module.exports = new UserService();