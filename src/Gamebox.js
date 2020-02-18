import React, {useReducer} from 'react';
import Grid from './Grid';
import {reducer} from './Reducer';

const initialBoxes = new Array(7 * 6).fill("white");
const initialHalfBoxesTop = new Array (7 * 1).fill("white");

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
         //console.log(state.indicatorPlay)                                       
        if (state.indicatorPlay){
            indicatorColor1 = "indicator-dot red";
            indicatorColor2 = "indicator-dot";            
        } else {
            indicatorColor1 = "indicator-dot";
            indicatorColor2 = "indicator-dot red";
        }     
        
        if (state.winningStatus){
            gameResult = "game-result";
            indicatorColor1 = "indicator-dot";
            indicatorColor2 = "indicator-dot"; 
        }

return  <>
            <div className="sidebar one">
                <div className= {indicatorColor1}></div>
                <h2>Player 1</h2>
                <h1>{state.player1Score}</h1>
                <p>{state.winnerText1}</p>
            </div>
            <div className="game-boxes">
                <div className={gameResult}>{state.winnerText}</div>
                <div className="menu-bar">
                    <h1>CONNECT 4</h1>
                    <button onClick={()=> dispatch({type: "newGame"})}>NEW GAME</button>
                    <button onClick= {() => dispatch({type: "resetGame"})}>RESET GAME</button>
                </div>
                <Grid boxes = {state.boxes} 
                      halfTopBoxes = {state.halfBoxesTop}
                      onMouseOut = {(i) => dispatch({ type: "hoverOut", index: i})}
                      onMouseOver={(i) => dispatch({ type: "hover", index: i})} 
                      onClick={(i) => dispatch({ type: "fill", index: i })} />  
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