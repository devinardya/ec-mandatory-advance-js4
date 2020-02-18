import {checkWinner} from './checkWinner';

const initialBoxes = new Array(7 * 6).fill("white");
const initialHalfBoxesTop = new Array (7 * 1).fill("#e6e6e6");

function reducer(state, action) {
   
    switch (action.type) {
        // the action type used on a specific onClick function based on the function
        case "fill":
            
            // if there already someone winning, stop the game
            if (state.winningStatus){
                return state;
            }

            //copy the boxes from the state to a new variable
            //then by using the index of the array to pint point a specific box, set the color chosen from the color picker

            const newBoxes = [...state.boxes];
            const column = action.index % 7;
            let index = 5 * 7 + column;
      
            console.log("index", index);
  
            const allFilledBox = [...state.filledBox];
            while (allFilledBox.includes(index)){
                index -= 7; 
            }

            if (index < 0) {
                return state;
            }

            newBoxes[index] = state.color;

            //console.log("filledbox", state.filledBox)

            // function to check if there's a winning combination on every input from the player
            const winner = checkWinner(newBoxes);
            //console.log(winner[2])
   
            return {
                //saving every changes done to the state by doing the spread (...)
                ...state,
                //setting a specific state to the new one (like setState on class)
                boxes: newBoxes,
                color: state.color === "pink" ? "grey" : "pink",
                halfBoxesTop : initialHalfBoxesTop,
                filledBox: [...state.filledBox, index],
                indicatorPlay: state.indicatorPlay === true ? false : true,
                winnerText: winner[0],
                player1Score: state.player1Score + winner[1],
                //winnerText2: winner[2],
                player2Score: state.player2Score + winner[2],
                winningStatus: winner[3],
            }
        
        case "hover": {
            if (state.winningStatus){
                return state;
            }

            const newHalfBoxes = [...state.halfBoxesTop];
            const indexHalfBox = action.index % 7;
            newHalfBoxes[indexHalfBox] = state.halfBoxColor;


            return {
                ...state,
                halfBoxesTop: newHalfBoxes,
                halfBoxColor: "#e6e6e6",
                indicatorPlay: state.indicatorPlay,
            }
        }

        case "hoverOut": {
            if (state.winningStatus){
                return state;
            }

            const newHalfBoxes = [...state.halfBoxesTop];
            const indexHalfBox = action.index % 7;
            newHalfBoxes[indexHalfBox] = state.halfBoxColor;

            return {
                ...state,
                halfBoxesTop: newHalfBoxes,
                halfBoxColor: state.color,
                indicatorPlay: state.indicatorPlay,
            }
        } 
        
        // action to start a new game with keeping the current score to the next one    
        case "newGame":
            return {
                ...state,
                filledBox: [],
                boxes: initialBoxes,
                color: "pink",
                halfBoxesTop : initialHalfBoxesTop,
                winnerText: "",
                indicatorPlay: true,
                winningStatus: false,
            }

        // action to start a reset the whole game

        case "resetGame":
            return {
                ...state,
                boxes: initialBoxes, 
                filledBox: [], 
                color: "pink",
                halfBoxesTop : initialHalfBoxesTop,
                player1Score: 0, 
                player2Score: 0,
                winnerText: "",
                indicatorPlay: true,
                winningStatus: false,
            }
        default:
        return state;
    }
}

export {reducer};