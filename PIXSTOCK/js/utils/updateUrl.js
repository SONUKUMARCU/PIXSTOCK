"use strict"

import { urlEncode } from "./urlEncode.js";

/**
 * update url
 * @param {Object} filterObj Filter object
 * @param {String} searchType search Type eg. 'videos' or 'photos'
 */

export const updateUrl = (filterObj,searchType)=>{
    setTimeout(()=>{
        const /** {String} */ root = window.location.origin;
        const /** {String} */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
        
    },500);
}   