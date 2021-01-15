const axios = require('axios').default;

const post = (url, data, isHeaderReq=false, header=null ) =>{
    return axios.post(url, data,isHeaderReq && header );
}
const get = (url, isHeaderReq=false, header=null ) =>{
    return axios.get(url,isHeaderReq && header);
}
module.exports = {post, get};