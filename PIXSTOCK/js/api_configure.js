"use strict"

import { urlEncode } from "./utils/urlEncode.js";

const /* {String} */ API_KEY  = "8sxQ4DuCX88qTSgQFraW2Hoisv6MgKBXRuBZN04XRTGinoeN5LI0hbde";


const /** {Function} */ headers = new Headers();
headers.append("Authorization", API_KEY);


const /** {object} */ requestOptions = {headers};

const fetchData = async function(url, successCallback){
    const /** {Promise} */ response = await fetch(url,requestOptions);

    if(response.ok){
        const /** {Object } */ data = await response.json();
        successCallback(data);
    }
}


let /** {String} */ requestUrl = "";

const /** {Object} */ root = {
    default : "https://api.pexels.com/v1/",
    videos : "https://api.pexels.com/videos/"
}


export const /** {object} */ client = {
    photos : {
        search(parameters, callback){
            requestUrl =`${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        },

        curated(parameters,callback){
            fetchData(`${root.default}curated?${urlEncode(parameters)}`,callback);
        },

        detail(id,callback){
            fetchData(`${root.default}photos/${id}`,callback);
        }
    },
    videos : {
        search(parameters, callback){
            requestUrl =`${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        },

        popular(parameters,callback){
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`,callback);
        },

        detail(id,callback){
            fetchData(`${root.videos}videos/${id}`,callback);
        }
    },
    collections : {
        featured(parameters, callback){
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl,callback);
        },

        detail(id,parameters,callback){
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`
            fetchData(requestUrl,callback);
        }
    },
}