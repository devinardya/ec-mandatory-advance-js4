import { checkWinner } from './checkWinner';
import { aiMoving} from './aiMoving';

const initialBoxes = new Array(7 * 6).fill("white");
const initialHalfBoxesTop = new Array(7 * 1).fill("#e6e6e6");



function reducer(state, action) {

    switch (action.type) {
        // the action type used on a specific onClick function based on the function
        case "fill":

            if (state.aiIsMoving) {
                return state;
            }

            // if there already someone winning, stop the game
            if (state.winningStatus) {
                return state;
            }
            console.log("human move")
            if(!state.AI) {
                
                //copy the boxes from the state to a new variable
                //then by using the index of the array to pint point a specific box, set the color chosen from the color picker

                const newBoxes = [...state.boxes];
                const column = action.index % 7;
                let index = 5 * 7 + column;

                let allFilledBox = [...state.filledBox];
                while (allFilledBox.includes(index)) {
                    index -= 7;
                }

                if (index < 0) {
                    return state;
                }

                newBoxes[index] = state.color;

                // function to check if there's a winning combination on every input from the player, return an array
                const winner = checkWinner(newBoxes);
                //console.log(winner[2]

        
                return {
                    //saving every changes done to the state by doing the spread (...)
                    ...state,
                    //setting a specific state to the new one (like setState on class)
                    boxes: newBoxes,
                    color: state.color === "pink" ? "grey" : "pink",
                    halfBoxesTop: initialHalfBoxesTop,
                    filledBox: [...state.filledBox, index],
                    indicatorPlay: state.indicatorPlay === true ? false : true,
                    winnerText: winner[0],
                    player1Score: state.player1Score + winner[1],
                    player2Score: state.player2Score + winner[2],
                    winningStatus: winner[3],
                }
            } else {

                const newBoxes = [...state.boxes];
                const column = action.index % 7;
                let index = 5 * 7 + column;

                let allFilledBox = [...state.filledBox];
                while (allFilledBox.includes(index)) {
                    index -= 7;
                }

                if (index < 0) {
                    return state;
                }

                
                newBoxes[index] = "pink";
                

                // function to check if there's a winning combination on every input from the player, return an array
                const winner = checkWinner(newBoxes);
                //console.log(winner[2]

        
                return {
                    //saving every changes done to the state by doing the spread (...)
                    ...state,
                    //setting a specific state to the new one (like setState on class)
                    boxes: newBoxes,
                    halfBoxesTop: initialHalfBoxesTop,
                    filledBox: [...state.filledBox, index],
                    indicatorPlay: state.indicatorPlay === true ? false : true,
                    winnerText: winner[0],
                    player1Score: state.player1Score + winner[1],
                    player2Score: state.player2Score + winner[2],
                    winningStatus: winner[3],
                    AIMoving: true,
            }
        }

        case "ai_is_moving":
            return {
                ...state,
                aiIsMoving: true,
            }
            
        
        case "AIFill":

           
            console.log("AI move start, action.index is ");
            // if there already someone winning, stop the game
            if (state.winningStatus) {
                return state;
            }

            
            console.log(aiMoving([...state.filledBox]))
            const newBoxesAI = [...state.boxes];
            let columnAI = action.index % 7;
            let indexAI = 5 * 7 + columnAI;

            let allFilledBoxAI = [...state.filledBox];
                while (allFilledBoxAI.includes(indexAI) && indexAI >= 0 ) {
                    indexAI -= 7;
                }

                if (indexAI < 0) {
                    return state;
                }

            
            newBoxesAI[indexAI] = "grey";
            

            // function to check if there's a winning combination on every input from the player, return an array
            const winner2 = checkWinner(newBoxesAI);
            //console.log(winner[2]

            console.log("AI move ending, index is", indexAI);

            return {
                //saving every changes done to the state by doing the spread (...)
                ...state,
                //setting a specific state to the new one (like setState on class)
                boxes: newBoxesAI,
                halfBoxesTop: initialHalfBoxesTop,
                filledBox: [...state.filledBox, indexAI],
                indicatorPlay: state.indicatorPlay === true ? false : true,
                winnerText: winner2[0],
                player1Score: state.player1Score + winner2[1],
                player2Score: state.player2Score + winner2[2],
                winningStatus: winner2[3],
                AIMoving : false,
                aiIsMoving: false,
            }

        case "hover":
          
            if (state.winningStatus) {
                return state;
            }
            // hovering across the column 
            const newHalfBoxes = [...state.halfBoxesTop];
            const indexHalfBox = action.index % 7;
            newHalfBoxes[indexHalfBox] = state.color;

            // change the color of the circle to light grey when the mouse is away from the circle and inside the outer teal box
            return {
                ...state,
                halfBoxesTop: newHalfBoxes,
                indicatorPlay: state.indicatorPlay,
            }

        case "hoverOut":
           
            if (state.winningStatus) {
                return state;
            }
            // change the color of the circle to the active color when the mouse is hovering inside the circle 
            const newHalfBoxesOut = [...state.halfBoxesTop];
            const indexHalfBoxOut = action.index % 7;
            newHalfBoxesOut[indexHalfBoxOut] = "#e6e6e6";

            return {
                ...state,
                halfBoxesTop: newHalfBoxesOut,
                indicatorPlay: state.indicatorPlay,
            }


        // action to start a new game with keeping the current score to the next one    
        case "newGame":
            return {
                ...state,
                filledBox: [],
                    boxes: initialBoxes,
                    color: "pink",
                    halfBoxesTop: initialHalfBoxesTop,
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
                    halfBoxesTop: initialHalfBoxesTop,
                    player1Score: 0,
                    player2Score: 0,
                    winnerText: "",
                    indicatorPlay: true,
                    winningStatus: false,
            }

        case "AIOn":
            return {
                ...state,
                AI: state.AI === false ? true : false,
            }

        default:
            return state;
    }
}

export {
    reducer
};