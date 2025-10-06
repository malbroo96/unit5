const url= require("url");
const querystring = require("querystring");
const { hostname } = require("os");


function parseUrl(fullUrl){
    const parsedUrl=url.parse(fullUrl);
    const queryParmas=querystring.parse(parsedUrl.query);


    return{
        hostname:parsedUrl.hostname,
        pathname:parsedUrl.pathname,
        query:queryParmas
    };
}



module.exports=parseUrl;