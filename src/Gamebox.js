import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
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
                                                    AIOn: false,
                                                });

    let indicatorColor1, indicatorColor2, gameResult, AiToggle, winScore1, winScore2;
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
            gameResult =  (<div className="game-result active">
                                <h3>{state.winnerText}</h3>
                           </div>)
            indicatorColor1 = "indicator-dot";
            indicatorColor2 = "indicator-dot"; 
        } /* else {
            gameResult = "game-result";
        } */

        if (state.AIOn) {
            AiToggle =  <>
                            <div  className="ai-toggle" 
                                    onClick={() => dispatch({ type: "AIOn" })}>
                                    <FaToggleOn size="30px" color="rgb(219, 40, 70" style={{marginRight: "10px", top: "5px", position: "relative"}}/>
                                    AI ON      
                            </div>
                            <p></p>
                         </>
        } else {
            AiToggle = <>
                            <div  className="ai-toggle" 
                            onClick={() => dispatch({ type: "AIOn" })}>
                            <FaToggleOff size="30px"  color="grey" style={{marginRight: "10px", top: "5px", position: "relative"}}/>
                            AI OFF
                            </div>
                            <p>Turn on AI to have computer as player 2</p>
                      </>
        }

        if (state.player1Score > state.player2Score) {
            winScore2 = {color: "grey"};
            winScore1 = {color: "rgb(255, 126, 148)"};
        } else if (state.player1Score < state.player2Score) {
            winScore2 = {color: "rgb(255, 126, 148)"};
            winScore1 = {color: "grey"};
        } else {
            winScore2 = {color: "grey"};
        }

return  <> 
            <div className="sidebar one">
                <div className= {indicatorColor1}></div>
                <h2>Player 1</h2>
                <h1 style={winScore1}>{state.player1Score}</h1>
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
                {AiToggle}
                <div className= {indicatorColor2}></div>
                
                <h2>Player 2</h2>
                <h1 style={winScore2}>{state.player2Score}</h1>
                <p>{state.winnerText2}</p>
            </div>
            {ReactDOM.createPortal(gameResult, document.body)}
        </>     
}

export default GameBox;