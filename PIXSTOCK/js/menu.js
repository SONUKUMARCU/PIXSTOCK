"use strict"

import { addEventOnElement } from "./utils/event.js"


export const menu = function ($menuWrapper,callback){
    const /** {NodeElement} */ $menu = $menuWrapper.querySelector("[data-menu]");
    const /** {NodeList} */ $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]");
    const /** {NodeList} */ $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]");

    addEventOnElement($menuTogglers, "click", ()=>{ 
        $menu.classList.toggle("expanded");
    })

    addEventOnElement($menuItems, "click", function(){
        $menu.classList.remove("expanded");
        if(callback) callback(this.dataset.menuItem)
    })
}