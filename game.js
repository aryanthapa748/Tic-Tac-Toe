const Gameboard = (()=>{
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = ()=>{
        let boardHTMl = "";
        gameboard.forEach((square, index)=>{
            boardHTMl += `<div class="square" id=square-${index}">${square}</div>`
        })
    }
    document.querySelector("#gameboard").innerHTML = boardHTMl;

    return{
        render,
    }
})();

const startButton = document.querySelector("#startGame");
startButton.addEventListener("click", ()=>{
    window.alert("Hy Lets start our game");
});