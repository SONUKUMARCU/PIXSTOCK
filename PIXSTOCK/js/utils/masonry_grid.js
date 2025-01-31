"use strict"

export const gridInit = function($gridContainer){
    const /** {NodeList} */ $columns = [];
    const /** {Array} */ columnsHeight = [];

    const /** {Number} */ columnCount = Number(getComputedStyle($gridContainer).getPropertyValue("--column-count"));
    // console.log(columnCount);



    for(let i = 0; i<columnCount; i++){
        const /** {NodeElement} */ $column = document.createElement("div");
        $column.classList.add("column");
        $gridContainer.appendChild($column);
        $columns.push($column);
        columnsHeight.push(0);
    }

    return {$columns,columnsHeight};

}
export const updateGrid = function($card, columnsHeight,$columns){

    const /** {Number} */ minColumnHeight = Math.min(...columnsHeight);
    const /** {Number} */ minColumnIndex = columnsHeight.indexOf(minColumnHeight);

    $columns[minColumnIndex].appendChild($card);
    columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;
}