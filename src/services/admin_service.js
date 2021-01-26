const axios = require('./axios_service');
var config = require('./config');
class AdminService {
    login(value){
        let url = config.url + 'admin/login'
        return axios.post(url, value);
    }
    getAllBooks(){
        let url = config.url + 'get/book';
        return axios.get(url);
    }
    addBooks(value){
        let header = {
            headers: {
              'token' : localStorage.getItem("token")
            }
          };
        let url = config.url + 'admin/add/book';
        return axios.post(url, value, true , header);
    }
    deleteBooks(book){
        let header = {
            headers: {
              'token' : localStorage.getItem("token")
            }
          };
        let url = `${config.url}admin/delete/book/${book._id}`;
        return axios.Delete(url, true , header);
    }
    updateBooks(value,productId){
      let header = {
        headers: {
          'token' : localStorage.getItem("token")
        }
      };
        let url = `${config.url}admin/update/book/${productId}`;
        return axios.put(url, value, true , header );
    }
}


module.exports = new AdminService();