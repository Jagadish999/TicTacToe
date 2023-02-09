//All controlles for two player
class TwoPlayerController{
    constructor(){
        
    }
    playFunc(element, availableArea, eventMsg){
        let availableSpace = this.countSpaces();
        let resBool;

        for(let i = 0; i < availableArea.length; i++){
            availableArea[i].style.border = "2px solid black";
        }

        //If two player mode is selected
        if(twoPlayerMode == true && singlePlayerMode == false){
            if(availableSpace % 2 == 0){
                resBool = this.createMove(element, availableArea, eventMsg, player2);
            }
            else{
                resBool = this.createMove(element, availableArea, eventMsg, player1);
            }
        }
        //if single player mode is selected
        else{
            //trun of O
            if(availableSpace % 2 != 0){
                if(computer == 'O'){
                    resBool = this.computerPlay();
                }
                else{
                    resBool = this.createMove(element, availableArea, eventMsg, player);
                    if(!resBool){
                        resBool = this.computerPlay();
                    }
                    
                }
            }
            //turn of X
            else{
                if(computer == 'X'){
                    resBool = this.computerPlay();
                }
                else{
                    resBool = this.createMove(element, availableArea, eventMsg, player);
                    if(!resBool){
                        resBool = this.computerPlay();
                    }
                }
            }
        }

        return resBool;
    }

    computerPlay(){
        // let allEmptyPos = this.emptyPosState(ticTacToeState);
        const a = document.getElementsByTagName('td');
        const e = document.getElementsByClassName('playerMsg')[0];
        let bestPos = this.findBestPos();

        return this.createMove(a[bestPos], a, e, computer);
    }

    findBestPos(){
        let avaliablePos = this.emptyPosState(ticTacToeState);
        let cloneState;
        for(let i = 0; i < avaliablePos.length; i++){
            cloneState = ticTacToeState.slice(0);

            if(computer == 'O'){
                cloneState[avaliablePos[i]] = 'O';
                if(checkWin(cloneState, 'O')){
                    return avaliablePos[i];
                }
                cloneState[avaliablePos[i]] = 'X';
                if(checkWin(cloneState, 'X')){
                    return avaliablePos[i];
                }
            }
            else{
                cloneState[avaliablePos[i]] = 'X';
                if(checkWin(cloneState, 'X')){
                    return avaliablePos[i];
                }
                cloneState[avaliablePos[i]] = 'O';
                if(checkWin(cloneState, 'O')){
                    return avaliablePos[i];
                }
            }
        }
        cloneState = ticTacToeState.slice(0);
        let parentNode = new TicTacToeNode(null, cloneState, computer, null);
        console.log(parentNode);
        parentNode.expand();

        // for(let i = 0; i < parentNode.children.length; i++){
            // if(checkWin(parentNode.children[i].state, computer)){
            //     console.log("You can directly win");
            //     return parentNode.children[i].position;
            // }
            // if(checkWin(parentNode.children[i].state, player)){
            //     console.log("player can directly win");
            //     return parentNode.children[i].position;
            // }
        // }
        for(let i = 0; i < 100000; i++){
            let selectedChild = parentNode.selectNode();
            let winner = selectedChild.runSimulation();
            selectedChild.backPropagate(winner);
        }

        let highestWins = 0;
        let winningPos = parentNode.children[0].position;
        for(let i = 0; i < parentNode.children.length; i++){
            if(parentNode.children[i].wins > highestWins){
                highestWins = parentNode.children[i].wins;
                winningPos = parentNode.children[i].position;
            }
        }
        
        return winningPos;
    }

    emptyPosState(ticTacToeState){
        let tempArr = [];
        for(let i = 0; i < ticTacToeState.length; i++){
            if(ticTacToeState[i] == ''){
                tempArr.push(i);
            }
        }
        return tempArr;
    }

    createMove(element, availableArea, eventMsg, player){
        element.childNodes[0].innerHTML = player;
        ticTacToeState[element.childNodes[0].id] = player;
        let winState = checkWin(ticTacToeState, player);

        if(winState){
            gameOver = true;
            eventMsg.childNodes[0].innerHTML = player + " won the Game";
            highLightWinning(ticTacToeState, player, availableArea);
            return true;
        }
        if(this.countSpaces() == 0){
            gameOver = true;
            eventMsg.childNodes[0].innerHTML = "Game Draw";
            return true;
        }
        else{
            eventMsg.childNodes[0].innerHTML = player + " played in position #" + (parseInt(element.childNodes[0].id) + 1);
            return false;
        }
    }

    countSpaces(){
        let temp = 0;
        for(let i = 0; i < ticTacToeState.length; i++){
            if(ticTacToeState[i] == ''){
                temp++;
            }
        }
        return temp;
    }
}