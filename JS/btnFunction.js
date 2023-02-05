function playBtnFunc(){
    var playerBtn = document.getElementsByTagName('button')[0];
    var computerBtn = document.getElementsByTagName('button')[1];

    playerBtn.addEventListener('click', twoPlayerSetup);
    computerBtn.addEventListener('click', computerPlaySetup);
}

function twoPlayerSetup(){

    hideBtnShowBrd();
}

function computerPlaySetup(){
    console.log("not now");
}

//function to hide buttons and display boards
function hideBtnShowBrd(){

    var buttonContainer = document.getElementsByClassName('main-btn-container')[0];
    buttonContainer.style.display = 'none';

    var brd = document.getElementsByClassName('main-brd-container')[0];
    brd.style.display = 'flex';
}



//Just to load function after page is loaded
function allFunctionLoader(){
    playBtnFunc();
}

document.addEventListener('DOMContentLoaded', allFunctionLoader);