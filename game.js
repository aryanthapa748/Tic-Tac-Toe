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
            square.addEventListener("click", Game.handleClickhandleClick);      
        })  
        
    }

    const update = (index, value)=>{  //6
        gameboard[index] = value;
        render(); 
    }

    const getGameboard = () => gameboard; //7

    return{  //you have to explicitly return this cause its an IIFE so without this return its useless
        render,
        update, 
        getGameboard
    }
})();

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
        let index = parseInt(event.target.id.split("-")[1]); // if we console.event we can see whole bunch of properties, it is useful which square did we actually clicked. So eg: "square-0" since we dont want square- we split it and we only accessed 0 by array method [0]. and since it returns 0 as a string i wrapped the whole thing with parseInt
        if (Gameboard) 
        Gameboard.update(index, players[currentPlayerIndex].mark);  //introducing update() to update our display and inside that accessing index, players array and current player in that array
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return{   //you have to explicitly return this cause its an IIFE so without this return its useless
        start,
        handleClick
    }
})();

const startButton = document.querySelector("#startGame"); //1
startButton.addEventListener("click", ()=>{
    Game.start(); //4
});