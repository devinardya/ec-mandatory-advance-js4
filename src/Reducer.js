import {checkWinner} from './checkWinner';

const initialBoxes = new Array(7 * 6).fill("white");

function reducer(state, action) {
   
    switch (action.type) {
        // the action type used on a specific onClick function based on the function
        case "fill":
            //copy the boxes from the state to a new variable
            //then by using the index of the array to pint point a specific box, set the color chosen from the color picker
            const newBoxes = [...state.boxes];
            const column = action.index % 7;
            let index = 5 * 7 + column;
            console.log("index", index);
           /*  index -= 7; */

            
            const allFilledBox = [...state.filledBox];
            while (allFilledBox.includes(index)){
                index -= 7; 
            }

            if (index < 0) {
                return state;
            }

            newBoxes[index] = state.color;

            console.log("filledbox", state.filledBox)

            const winner = checkWinner(newBoxes);
            console.log(winner)
            if (winner === "one"){
                state.winnerText1 = "player 1 wins";
                state.player1Score += 1;
            } else if (winner === "two"){
                state.winnerText2 = "player 2 wins";
                state.player2Score += 1;
            }


            return {
                //saving every changes done to the state by doing the spread (...)
                ...state,
                //setting a specific state to the new one (like setState on class)
                boxes: newBoxes,
                color: state.color === "pink" ? "grey" : "pink",
                filledBox: [...state.filledBox, index],
                indicatorPlay: state.indicatorPlay === true ? false : true,
            }
            
        case "newGame":
            return {
                ...state,
                filledBox: [],
                boxes: initialBoxes,
                color: "pink",
                winnerText1: "",
                winnerText2: "",
            }

        case "resetGame":
            return {
                ...state,
                boxes: initialBoxes, 
                filledBox: [], 
                color: "pink",
                player1Score: 0, 
                player2Score: 0,
                winnerText1: "",
                winnerText2: "",
            }
        default:
        return state;
    }
}

export {reducer};