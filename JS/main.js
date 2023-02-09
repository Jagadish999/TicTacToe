function initialButtonController(){
    //defining two buttons for different game play
    const twoPlay = document.getElementsByClassName('btn-first')[0];
    const singlePlay = document.getElementsByClassName('btn-second')[0];

    const choose = document.getElementsByClassName('choose')[0];

    const chooseO = document.getElementsByClassName('chooseO')[0];
    const chooseX = document.getElementsByClassName('chooseX')[0];

    //defining all controllers for game play
    const move = document.getElementsByClassName('move')[0];
    const again = document.getElementsByClassName('again')[0];
    const exit = document.getElementsByClassName('exit')[0];
    const eventMsg = document.getElementsByClassName('playerMsg')[0];

    //all Openspaces for playing 'O' or 'X' in box
    const availableArea = document.getElementsByTagName('td');

    //controller
    twoPlayerController = new TwoPlayerController();

    //when even box is clicked border turns to red
    selectedBox(availableArea);

    //for knowing which mode of game is selected
    twoPlay.addEventListener('click', ()=>{
        hideBtnShowBrd();
        twoPlayerMode = true;
        singlePlayerMode = false;
    });

    singlePlay.addEventListener('click', ()=>{

        if(choose.style.display == 'none' || choose.style.display == ''){
            choose.style.display = 'block';
        }
        else{
            choose.style.display = 'none';
        }
    });
    chooseO.addEventListener('click', ()=>{
        player = 'O';
        computer = 'X';
        twoPlayerMode = false;
        singlePlayerMode = true;
        choose.style.display = 'none';
        hideBtnShowBrd();
    });
    chooseX.addEventListener('click', ()=>{
        player = 'X';
        computer = 'O';
        twoPlayerMode = false;
        singlePlayerMode = true;
        choose.style.display = 'none';
        hideBtnShowBrd();
        twoPlayerController.playFunc(null, availableArea, eventMsg);
    });

    move.addEventListener('click', ()=>{
        for(var i = 0; i < availableArea.length; i++){
            if(availableArea[i].style.border == "6px solid red"){
                gameStatus = twoPlayerController.playFunc(availableArea[i], availableArea, eventMsg);
            }
        }
        if(gameStatus){
            move.style.display = 'none';
            again.style.display = 'block';
        }
    });

    again.addEventListener('click', ()=>{
        move.style.display = 'block';
        again.style.display = 'none';
        gameOver = false;
        resetAllDefs(eventMsg, availableArea);

        if(twoPlayerMode == false && singlePlayerMode == true && computer == 'O'){
            twoPlayerController.playFunc(null, availableArea, eventMsg);
        }
        

    });

    exit.addEventListener('click', ()=>{
        move.style.display = 'block';
        again.style.display = 'none';
        gameOver = false;
        resetAllDefs(eventMsg, availableArea);
        for(let j = 0; j < availableArea.length; j++){
            availableArea[j].style.border = "2px solid black";
        }
        showBtnHideBrd();
        twoPlayerMode = false;
        singlePlayerMode = false;
    });
}

function resetAllDefs(eventMsg, availableArea){
    ticTacToeState = ['', '', '',
                      '', '', '',
                      '', '', '',];
    eventMsg.childNodes[0].innerHTML = "";

    for(var i = 0; i < availableArea.length; i++){
        availableArea[i].childNodes[0].innerHTML = '';
        availableArea[i].childNodes[0].style.color = 'black';
    }
}

function showBtnHideBrd(){
    let buttonContainer = document.getElementsByClassName('main-btn-container')[0];
    buttonContainer.style.display = 'block';

    let brd = document.getElementsByClassName('main-brd-container')[0];
    brd.style.display = 'none'; 
}

function hideBtnShowBrd(){
    let buttonContainer = document.getElementsByClassName('main-btn-container')[0];
    buttonContainer.style.display = 'none';

    let brd = document.getElementsByClassName('main-brd-container')[0];
    brd.style.display = 'flex';
}

function selectedBox(availableArea){

    for(let i = 0; i < availableArea.length; i++){
        if(availableArea[i].childNodes[0].innerHTML == ''){
            
            availableArea[i].addEventListener('click', ()=>{
                for(let j = 0; j < availableArea.length; j++){
                    availableArea[j].style.border = "2px solid black";
                }
                if(availableArea[i].childNodes[0].innerHTML == '' && !gameOver){
                    availableArea[i].style.border = "6px solid red";
                }
            });
        }
    }
}

function checkWin(state, player){
    for(var j = 0; j < state.length; j+=3){
        if(state[j] == player && state[j+1] == player && state[j+2] == player){
            return true;
        }
    }
    for(var j = 0; j < 3; j++){
        if(state[j] == player && state[j+3] == player && state[j+6] == player){
            return true;
        }
    }

    if(state[0] == player && state[4] == player && state[8] == player){
        return true;
    }

    if(state[2] == player && state[4] == player && state[6] == player){
        return true;
    }

    return false;
}

function highLightWinning(state, player, list){
    for(var j = 0; j < state.length; j+=3){
        if(state[j] == player && state[j+1] == player && state[j+2] == player){
            list[j].childNodes[0].style.color = "red";
            list[j+1].childNodes[0].style.color = "red";
            list[j+2].childNodes[0].style.color = "red";
        }
    }
    for(var j = 0; j < 3; j++){
        if(state[j] == player && state[j+3] == player && state[j+6] == player){
            list[j].childNodes[0].style.color = "red";
            list[j+3].childNodes[0].style.color = "red";
            list[j+6].childNodes[0].style.color = "red";
        }
    }

    if(state[0] == player && state[4] == player && state[8] == player){
        list[0].childNodes[0].style.color = "red";
        list[4].childNodes[0].style.color = "red";
        list[8].childNodes[0].style.color = "red";
    }

    if(state[2] == player && state[4] == player && state[6] == player){
        list[2].childNodes[0].style.color = "red";
        list[4].childNodes[0].style.color = "red";
        list[6].childNodes[0].style.color = "red";
    }

    return false;
}

function loadMyFunctions(){
    initialButtonController();
}

document.addEventListener('DOMContentLoaded', loadMyFunctions);