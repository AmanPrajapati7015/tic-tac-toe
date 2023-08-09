let Player = function(name, marker){
    return {name, marker}
}

let Player1 = Player("Player 1", "x");
let Player2 = Player("Player 2", "o");




let GameBoard = (function (){
    let gameBoard = [null, null, null, null, null, null, null, null, null] 

    let currentPlayer = Player1;
    function switchPlayer(){
        currentPlayer = (currentPlayer==Player1) ? Player2 : Player1
    }

    function updateNextPlayer(div){
        div.textContent = `${currentPlayer.name}'s (${currentPlayer.marker}) turn `
    }

    function checkWon(){
        for (let i = 0; i <3; i++){
            if (!!gameBoard[i] && gameBoard[i] == gameBoard[i+3] && gameBoard[i+3]  == gameBoard[i+6] ){
                return {winner:gameBoard[i], index:[i, i+3, i+6]}
            }
        }

        for (let i = 0; i<7; i +=3){
            if (!!gameBoard[i] && gameBoard[i] == gameBoard[i+1]&& gameBoard[i+1] == gameBoard[i+2]){
                return {winner : gameBoard[i], index:[i, i+1, i+2]}
            }
        }

        if (!!gameBoard[0] && gameBoard[0] == gameBoard[4] &&gameBoard[4]  == gameBoard[8]){
            return {winner: gameBoard[2], index:[0,4,8]}
        }
        else if (!!gameBoard[2] && gameBoard[2] == gameBoard[4] && gameBoard[4]== gameBoard[6]){
            return {winner: gameBoard[2], index:[2,4,6]}
        }
    
        if (gameBoard.every(value => value != null)){
            return {winner:"tie", index:[]}
        }
    }

    function highlight(index){
        for (let i in index){
            let cell = document.querySelector(`.grid-${index[i]+1}`);
            cell.classList.add('highlight');
        }
    }

    let turnDisplay = document.querySelector(".turn-display");
    updateNextPlayer(turnDisplay)

    function play(e){
        let cellDiv =  e.target
        dataIndex = +cellDiv.getAttribute("data-index")
        if (!gameBoard[dataIndex]){
            gameBoard[dataIndex] = currentPlayer.marker;
            cellDiv.textContent = currentPlayer.marker;
            switchPlayer();
            updateNextPlayer(turnDisplay);
            
            let won = checkWon();
            if (won){
                if (won.winner!= "tie"){
                    highlight(won.index)
                    alert(`player ${won.winner} has won`)
                }
                else{
                    alert('match has tied')
                }
            }
        }
        else{
            alert("you can't change a filled cell")
        }
    }




    let displayBoard = function(){
        for (let i = 0; i<gameBoard.length; i++){
            let cellDiv = document.querySelector(`.grid-${i+1}`);
            cellDiv.addEventListener("click", play);
            cellDiv.textContent = gameBoard[i];
        }
    }



    return {displayBoard, }
})();

GameBoard.displayBoard()













