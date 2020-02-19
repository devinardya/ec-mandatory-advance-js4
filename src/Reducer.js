import { checkWinner } from './checkWinner';

const initialBoxes = new Array(7 * 6).fill("white");
const initialHalfBoxesTop = new Array(7 * 1).fill("#e6e6e6");

async function ai() {
    console.log("come to ai")
    let random = new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve( Math.floor(Math.random() * Math.floor(6)));
        }, 1000)
    })
    
   let result = await random;
   console.log(result);
   return result;
}

function reducer(state, action) {

    switch (action.type) {
        // the action type used on a specific onClick function based on the function
        case "fill":

            // if there already someone winning, stop the game
            if (state.winningStatus) {
                return state;
            }

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

            if (state.AIOn) {
                newBoxes[index] = "pink"; // A.I is always grey
            } else {
                newBoxes[index] = state.color;
            }

            // function to check if there's a winning combination on every input from the player, return an array
            const winner = checkWinner(newBoxes);
            //console.log(winner[2]

            if (!state.AIOn || winner[3]) { // vs human
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
            } else { // vs AI

                // Latest filled box
                allFilledBox = [...allFilledBox, index];
        
                // randomize a number between 0 to 6.
                // check so that its index is not < 0
                
                let AIcolumn = Math.floor(Math.random() * Math.floor(6));
                /* let AIcolumn = ai();
                console.log(ai) */
                let AIindex = 5 * 7 + AIcolumn;

                while (allFilledBox.includes(AIindex) && AIindex >= 0) {
                    AIindex -= 7;

                    if (AIindex < 0) {
                        
                        AIcolumn = Math.floor(Math.random() * Math.floor(6));
                        AIindex = 5 * 7 + AIcolumn;
                    }
                }

                // add the gray box at AIindex location
                newBoxes[AIindex] = "grey";
             
                // Check for winner
                const winner = checkWinner(newBoxes);

                // Return the state
                return {
                    //saving every changes done to the state by doing the spread (...)
                    ...state,
                    //setting a specific state to the new one (like setState on class)
                    boxes: newBoxes,
                    color: "pink",
                    halfBoxesTop: initialHalfBoxesTop,
                    filledBox: [...state.filledBox, index, AIindex],
                    indicatorPlay: true,
                    winnerText: winner[0],
                    player1Score: state.player1Score + winner[1],
                    player2Score: state.player2Score + winner[2],
                    winningStatus: winner[3],
                }
            }

        case "hover":
            if (state.winningStatus) {
                return state;
            }
            // hovering across the column 
            const newHalfBoxes = [...state.halfBoxesTop];
            const indexHalfBox = action.index % 7;
            newHalfBoxes[indexHalfBox] = state.halfBoxColor;

            // change the color of the circle to light grey when the mouse is away from the circle and inside the outer teal box
            return {
                ...state,
                halfBoxesTop: newHalfBoxes,
                    halfBoxColor: "#e6e6e6",
                    indicatorPlay: state.indicatorPlay,
            }

        case "hoverOut":
            if (state.winningStatus) {
                return state;
            }
            // change the color of the circle to the active color when the mouse is hovering inside the circle 
            const newHalfBoxesOut = [...state.halfBoxesTop];
            const indexHalfBoxOut = action.index % 7;
            newHalfBoxesOut[indexHalfBoxOut] = state.halfBoxColor;

            return {
                ...state,
                halfBoxesTop: newHalfBoxesOut,
                    halfBoxColor: state.color,
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
                AIOn: state.AIOn === true ? false : true,
            }

        default:
            return state;
    }
}

export {
    reducer
};