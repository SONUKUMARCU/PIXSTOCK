"use strict";


import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


const /** {NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";    

const /**{NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach($filterWrapper =>{
    filter($filterWrapper, window.filterObj, (newObj)=>{
        console.log(window.filterObj)
        updateUrl(newObj,"photos") 
    });
})


/***
 * Render curated or searched photos
 * if searched something then render searched photos 
 * otherwise render curated photos
 */

const /** {NodeElement} */  $photoGrid = document.querySelector("[data-photo-grid]");
const /** {NodeElement} */  $title = document.querySelector("[data-title]");
const /** {NodeElement} */  photoGrid = gridInit($photoGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /**{String} */ searchUrl = window.location.search.slice(1);
let /** {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** {String} */ title = searchObj ? `${searchObj.query} photos ` : "Curated photos";

$title.textContent = title;
document.title = title;

/**
 * Render all photos
 */

const renderPhotos = function(currentPage){
    client.photos[searchObj ? "search" : "curated"]({...searchObj, per_page: perPage, page: currentPage},data =>{
        totalPage = Math.ceil(data.total_results / perPage);

        data.photos.forEach(photo =>{
            const /**{NodeElement}*/ $photoCard = photoCard(photo);
            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);    
        })  

        // when phtos loaded
        isLoaded = true;

        // when no more photos found, hide loader
        if(currentPage >= totalPage) $loader.style.display = "none";
    })
}
renderPhotos(currentPage);

/**
 * Load more Photos
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");   
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll",function(){
    if($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded){
        currentPage++;
        renderPhotos(currentPage);
        isLoaded = false;
    }
})
