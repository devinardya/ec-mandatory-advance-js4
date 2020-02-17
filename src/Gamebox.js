import React, {useReducer} from 'react';
import Grid from './Grid';
import {reducer} from './Reducer';

const initialBoxes = new Array(7 * 6).fill("white");

const GameBox = () => {

    const [state, dispatch] = useReducer(reducer, {color: "pink", 
                                                boxes: initialBoxes, 
                                                filledBox: [], 
                                                player1Score: 0, 
                                                player2Score: 0,
                                                winnerText1: "",
                                                winnerText2: "",
                                                indicatorPlay: true,
                                                });

    let indicatorColor1, indicatorColor2;
         //console.log(state.indicatorPlay)                                       
        if (state.indicatorPlay){
            indicatorColor1 = {backgroundColor: "red"}
            indicatorColor2 = {backgroundColor: "#d3d3d3"}             
        } else {
            indicatorColor1 = {backgroundColor: "#d3d3d3"} 
            indicatorColor2 = {backgroundColor: "red"} 
        }     

return  <>
            <div className="sidebar one">
                <div className= "indicator-dot" style={indicatorColor1}></div>
                <h2>Player 1</h2>
                <h1>{state.player1Score}</h1>
                <p>{state.winnerText1}</p>
            </div>
            <div className="game-boxes">
                <div className="menu-bar">
                    <button onClick={()=> dispatch({type: "newGame"})}>NEW GAME</button>
                    <h1>CONNECT 4</h1>
                    <button onClick= {() => dispatch({type: "resetGame"})}>RESET GAME</button>
                </div>
                <Grid boxes = {state.boxes} onClick={(i) => dispatch({ type: "fill", index: i })} />  
            </div>
            <div className="sidebar two">
            <div className= "indicator-dot" style={indicatorColor2}></div>
                <h2>Player 2</h2>
                <h1>{state.player2Score}</h1>
                <p>{state.winnerText2}</p>
            </div>
        </>     
}

export default GameBox;