'use strict'

export const addEventOnElement = function($elements, eventType, callback){
    $elements.forEach($element => $element.addEventListener(eventType,callback));
}