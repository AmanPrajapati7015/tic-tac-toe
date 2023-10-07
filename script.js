let Player = function(name, marker){
    return {name, marker}
}

let Player1 = Player(prompt("player 1's name (x)"), "x");
let Player2 = Player("AI", "o");




let GameBoard = (function (){
    let gameBoard = [null, null, null, null, null, null, null, null, null]; 

    let winnerDisplay = document.querySelector(".cong");
    function displayWinner(msg){
        winnerDisplay.textContent = msg;
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
            return {winner: gameBoard[4], index:[0,4,8]}
        }
        else if (!!gameBoard[2] && gameBoard[2] == gameBoard[4] && gameBoard[4]== gameBoard[6]){
            return {winner: gameBoard[4], index:[2,4,6]}
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

    function playRandom(){
        let empty_cells = [];     //checking all possible moves for AI
        for (let i =0 ; i<9; i++){
            if (!gameBoard[i]) {
                empty_cells.push(i);
            }
        } 
        //pick an random available spot 
        let AIcell = empty_cells[Math.floor(Math.random()*empty_cells.length)];
        //playing AI move
        gameBoard[AIcell] = Player2.marker;
        let AIcellDiv = document.querySelector(`div[data-index="${AIcell}"]`);
        AIcellDiv.textContent = Player2.marker;
    }

    function play(e){
        let cellDiv =  e.target
        dataIndex = +cellDiv.getAttribute("data-index")
        if (!gameBoard[dataIndex]){
            gameBoard[dataIndex] = Player1.marker;
            cellDiv.textContent = Player1.marker;
            playRandom();
            
            let won = checkWon();
            if (won){
                if (won.winner!= "tie"){
                    highlight(won.index);
                    let wonPlayer = (won.winner == Player1.marker) ? Player1 : Player2 ;
                    displayWinner(`Player ${wonPlayer.name} (${wonPlayer.marker}) has won.`);
                }
                else{
                    displayWinner('Match has tied.')
                }
            }
        }
        else{
            alert("you can't change a filled cell")
        }
    }



    let displayBoard = function(){                     // also reset our whole game
        gameBoard = [null, null, null, null, null, null, null, null, null];
        displayWinner("");
        for (let i = 0; i<gameBoard.length; i++){
            let cellDiv = document.querySelector(`.grid-${i+1}`);
            cellDiv.addEventListener("click", play);
            cellDiv.classList.remove("highlight")
            cellDiv.textContent = gameBoard[i];
        }
    }



    return {displayBoard, gameBoard}
})();
GameBoard.displayBoard()



let resetBtn = document.querySelector("button.reset");
resetBtn.addEventListener("click", reset)
function reset(){
    GameBoard.displayBoard();
}












