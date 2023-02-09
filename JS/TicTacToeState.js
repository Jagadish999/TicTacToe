class TicTacToeNode{
    constructor(parent, state, computer, position){
        this.parent = parent;
        this.state = state;
        
        this.me = computer;
        this.position = position;

        this.wins = 0;
        this.plays = 0;
    }

    expand(){
        this.children = this.returnAllPossibleChild(this.state);
    }
    returnAllPossibleChild(array){
        let tempArr = [];
        for(let i = 0; i < array.length; i++){
            let cloneArray = array.slice(0);
            if(cloneArray[i] == ''){
                cloneArray[i] = this.me;
                tempArr.push(new TicTacToeNode(this, cloneArray, this.me, i));
            }
        }
        return tempArr;
    }
    selectNode(){
        let selectedChild = null;
        let selectedUCT = 0;
        for(let i = 0; i < this.children.length; i++){
            let childUCT = this.children[i].calcUctVal();
            if(selectedChild == null || childUCT > selectedUCT){
                
                selectedChild = this.children[i];
                selectedUCT = childUCT;
            }
        }
        return selectedChild;
    }
    calcUctVal(){
        let childWins = this.wins;
        let childPlays = this.plays;
        let totalSimulation = this.parent.plays;

        if(childPlays == 0){
            return Number.POSITIVE_INFINITY;
        }

        const c = Math.sqrt(2);
        const exploitation = childWins/childPlays;
        const exploration = c * Math.sqrt(Math.log2(totalSimulation) / childPlays);

        return exploitation + exploration;
    }

    runSimulation(){
        let randomPlayState = this.state.slice(0);
        let posAvailable = this.posToMove(randomPlayState);
        while(posAvailable.length > 0){
            let randPos = Math.floor(Math.random() * posAvailable.length);
            if(posAvailable.length % 2 == 0 && this.me == 'O'){
                randomPlayState[posAvailable[randPos]] = 'X';
            }
            else if(posAvailable.length % 2 == 0 && this.me == 'X'){
                randomPlayState[posAvailable[randPos]] = 'O';
            }
            else if(posAvailable.length % 2 != 0 && this.me == 'O'){
                randomPlayState[posAvailable[randPos]] = 'O';
            }
            else if(posAvailable.length % 2 != 0 && this.me == 'X'){
                randomPlayState[posAvailable[randPos]] = 'X';
            }
            posAvailable.splice(randPos, 1);
            if(checkWin(randomPlayState, 'O')){
                return 'O';
            }
            if(checkWin(randomPlayState, 'X')){
                return 'X';
            }
        }
        return null;
    }
    backPropagate(winner){
        this.plays++;
        this.parent.plays++;
        if(winner == null){
            this.wins += 0;
        }
        else if(winner == this.me){
            this.wins += 1;
        }
        else{
            this.wins += -1;
        }
    }


    posToMove(array){
        let tempArr = [];
        for(let i = 0; i < array.length; i++){
            if(array[i] == ''){
                tempArr.push(i);
            }
        }
        return tempArr;
    }
}