let GameBoard = (function (){
    let gameBoard = [ "x", "o", "o","o",null , "x",null, "o", "x"]

    let displayBoard = function(){
        for (let i = 0; i<gameBoard.length; i++){
            let selector = `.grid-${i+1}`
            let cellDiv = document.querySelector(selector);
            cellDiv.textContent = gameBoard[i];
        }
    }
    return {displayBoard}
})();

GameBoard.displayBoard()
