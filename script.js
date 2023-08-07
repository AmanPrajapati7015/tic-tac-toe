let Player = function(name, marker){
    return {name, marker}
}

let Player1 = Player("Aman", "x");
let Player2 = Player("Shiwani", "o");




let GameBoard = (function (){
    let gameBoard = [ null, null, null, null, null, null, null, null, null ]

    let currentPlayer = Player1;
    function switchPlayer(){
        currentPlayer = (currentPlayer==Player1) ? Player2 : Player1
    }

    function play(e){
        let cellDiv =  e.target
        dataIndex = +cellDiv.getAttribute("data-index")
        if (!gameBoard[dataIndex]){
            gameBoard[dataIndex] = currentPlayer.marker;
            cellDiv.textContent = currentPlayer.marker
            switchPlayer()
        }
        else{
            alert("you can't change a filled cell")
        }
    }


    let displayBoard = function(){
        for (let i = 0; i<gameBoard.length; i++){
            let cellDiv = document.querySelector(`.grid-${i+1}`);
            cellDiv.addEventListener("click", play)
            cellDiv.textContent = gameBoard[i];
        }
    }



    return {displayBoard}
})();

GameBoard.displayBoard()













