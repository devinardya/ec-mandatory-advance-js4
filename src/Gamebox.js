import React, {useReducer} from 'react';
import Grid from './Grid';
import {reducer} from './Reducer';

const initialBoxes = new Array(7 * 6).fill("white");
const initialHalfBoxesTop = new Array (7 * 1).fill("#e6e6e6");

const GameBox = () => {

    const [state, dispatch] = useReducer(reducer, { color: "pink", 
                                                    halfBoxColor: "pink",
                                                    boxes: initialBoxes, 
                                                    halfBoxesTop : initialHalfBoxesTop,
                                                    filledBox: [], 
                                                    player1Score: 0, 
                                                    player2Score: 0,
                                                    winnerText: "",
                                                    indicatorPlay: true,
                                                    winningStatus: false,
                                                });

    let indicatorColor1, indicatorColor2, gameResult;
         // to control the toggle of the dot color to show which player is active                                   
        if (state.indicatorPlay){
            indicatorColor1 = "indicator-dot red";
            indicatorColor2 = "indicator-dot";            
        } else {
            indicatorColor1 = "indicator-dot";
            indicatorColor2 = "indicator-dot red";
        }     
        
        // if someone is winning, then reset the dot color to grey and show the winner announcement box
        if (state.winningStatus){
            gameResult = "game-result active";
            indicatorColor1 = "indicator-dot";
            indicatorColor2 = "indicator-dot"; 
        } else {
            gameResult = "game-result";
        }

return  <>
             <div className={gameResult}>
                    <h3>{state.winnerText}</h3>
            </div>
            <div className="sidebar one">
                <div className= {indicatorColor1}></div>
                <h2>Player 1</h2>
                <h1>{state.player1Score}</h1>
                <p>{state.winnerText1}</p>
            </div>
            <div className="game-boxes">
                <div className="menu-bar">
                    <h1>CONNECT<span>4</span></h1>
                </div>
                <Grid boxes = {state.boxes} 
                      halfTopBoxes = {state.halfBoxesTop}
                      onMouseOut = {(i) => dispatch({ type: "hoverOut", index: i})}
                      onMouseOver={(i) => dispatch({ type: "hover", index: i})} 
                      onClick={(i) => dispatch({ type: "fill", index: i })} 
                />  
                <div className="menu-bar">
                    <button onClick={()=> dispatch({type: "newGame"})}>NEW GAME</button>
                    <button onClick= {() => dispatch({type: "resetGame"})}>RESET GAME</button>
                </div>
            </div>
            <div className="sidebar two">
            <div className= {indicatorColor2}></div>
                <h2>Player 2</h2>
                <h1>{state.player2Score}</h1>
                <p>{state.winnerText2}</p>
            </div>
        </>     
}

export default GameBox;