import React, {useReducer} from 'react';
import Grid from './Grid';


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
            return {
                //saving every changes done to the state by doing the spread (...)
                ...state,
                //setting a specific state to the new one (like setState on class)
                boxes: newBoxes,
                color: state.color === "red" ? "blue" : "red",
                filledBox: [...state.filledBox, index]
            }
            break;
        default:
        return state;
    }
}

const initialBoxes = new Array(7 * 6).fill("white");
const GameBox = () => {

    const [state, dispatch] = useReducer(reducer, {color: "blue", boxes: initialBoxes, filledBox: []});

return  <>
            <Grid boxes = {state.boxes} onClick={(i) => dispatch({ type: "fill", index: i })} />  
        </>
          
}

export default GameBox;