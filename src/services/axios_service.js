const axios = require('axios').default;

const post = (url, data, isHeaderReq=false, header=null ) =>{
    return axios.post(url, data,isHeaderReq && header );
}
const get = (url, isHeaderReq=false, header=null ) =>{
    return axios.get(url,isHeaderReq && header);
}
const put = (url, data , isHeaderReq=false, header=null ) =>{
    return axios.put(url,data ,isHeaderReq && header);
}
const Delete = (url, isHeaderReq=false, header=null ) =>{
    return axios.delete(url,isHeaderReq && header);
}
module.exports = {post, get , put , Delete };