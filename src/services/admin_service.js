const axios = require('./axios_service');
var config = require('./config');
class AdminService{
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
}
module.exports = new AdminService();