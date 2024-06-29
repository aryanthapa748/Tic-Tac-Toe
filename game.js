// Gameboard = Responsible for the logic of rendering the Gameboard
const Gameboard = (()=>{  //2
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = ()=>{
        let boardHTMl = "";
        gameboard.forEach((square, index)=>{
            boardHTMl += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTMl;
        const squares = document.querySelectorAll(".square");  // 5 we have to write here too and in the game () too
        squares.forEach((square)=>{
            square.addEventListener("click", Game.handleClick);      
        })     
    }

    const update = (index, value)=>{  //6
        gameboard[index] = value;
        render(); 
    }

    const getGameboard = () => gameboard; //7

    return{  //you have to explicitly return this cause its an IIFE so without this return its useless
        render,  // one thing to notice that every single function that we have introduced we have to explicitly return/call it else we cannot access/use those
        update, 
        getGameboard
    }
})();

// createPlayer = factory function that helps us use as many players as we need and we used this down in the other function 
const createPlayer = (name, mark) => { // middle = 3; i created this in the middle of //3 in order to have access in our player array down on const Game() 
    return{
        name,
        mark
    }
};

const Game = (()=>{  //3
    let players=[];
    let currentPlayerIndex;
    let gameOver;

    const start = ()=>{
        players=[
            createPlayer(document.querySelector("#playerO").value, "X"),
            createPlayer(document.querySelector("#playerX").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render(); 
        //now after we had our squares visible next step is to add DOM in all our square 
        const squares = document.querySelectorAll(".square");  // 5
        squares.forEach((square)=>{
            square.addEventListener("click", handleClick);      // basically we now have to make a new function called handleClick
        })  
    }
    const handleClick = (event) =>{           // middle = 5; handleClick function that we introduced in Gameboard()
        if(gameOver){ // 16
            return;
        } // upto here
        let index = parseInt(event.target.id.split("-")[1]); // if we console.event we can see whole bunch of properties, it is useful which square did we actually clicked. So eg: "square-0" since we dont want square- we split it and we only accessed 0 by array method [0]. and since it returns 0 as a string i wrapped the whole thing with parseInt
        if (Gameboard.getGameboard()[index] !== "")  //8 logic connected with 7
        return;

        Gameboard.update(index, players[currentPlayerIndex].mark);  //introducing update() to update our display and inside that accessing index, players array and current player in that array

        // now we need to check the conditions to declare who wins 
        if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)){  //10
            gameOver = true;
            displayController.renderMessage(`Yay !!! ${players[currentPlayerIndex].name} won !`);
        } else if (checkForTie(Gameboard.getGameboard())){  // 12
            gameOver = true;
            displayController.renderMessage(`It's a tie.`);
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {   //10
        //first we need to make the gameboard array empty in our Gameboard(). Since we cannot access the gameboard directly, we have to do for loop
        for(let i = 0; i < 9; i++){   // since we have 9 squares i < 9
            Gameboard.update(i , "");  //emptying the Gameboard. we cannot empty just by doing this we have to re-render it
        }
        Gameboard.render(); // now we can see that we have emptied it
        gameOver = false; // 17 // last step
        document.querySelector("#message").innerHTML = ""; // 15 = once we display the message we have to reset so an empty string
    } 

    return{   //you have to explicitly return this cause its an IIFE so without this return its useless 
        start,     // one thing to notice that every single function that we have introduced we have to explicitly return/call it else we cannot access/use those
        handleClick,
        restart
    }
})();

function checkForWin(board){  //11
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i = 0; i < winningCombinations.length; i++){
        const [ a, b, c] = winningCombinations[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        } 
    }
    return false;
}


function checkForTie(board){ //13
    return board.every(cell => cell !== "")
}

// displayController = Responsible for displaying the message
const displayController = (() =>{ // 14 Instead of alert we have to display the message so this is for that
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return{
        renderMessage
    }
})();
     
const startButton = document.querySelector("#startGame"); //1
startButton.addEventListener("click", ()=>{
    Game.start(); //4
});

const restartButton = document.querySelector("#restartGame"); //9
restartButton.addEventListener("click", ()=>{
    Game.restart(); // we introduced restart() which we are going to implement in our Game()
})

