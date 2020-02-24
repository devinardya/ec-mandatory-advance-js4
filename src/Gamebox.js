import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import {reducer} from './Reducer';
import Sidebar from './Sidebar';
import { FaToggleOn, FaToggleOff} from "react-icons/fa";

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
                                                    AI: false,
                                                    AIMoving: false,
                                                });

        
                                          
    let gameResult, filler, AiToggle;
                                       
    // if someone is winning, then reset the dot color to grey and show the winner announcement box
    if (state.winningStatus){
        gameResult =  (<div className="game-result">
                            <h3>{state.winnerText}</h3>
                        </div>)
        }

   // console.log("AI Moving", state.AIMoving)
    if(state.AIMoving){
        console.log("this got AImove")
        filler = "AIFill"
    } else {
        filler = "fill"
    } 

    if (state.AI) {
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

   // AiToggle = null;

return  <> 
             <Sidebar 
                sidebar = "one"
                player1Score = {state.player1Score}
                player2Score = {state.player2Score}
                indicatorPlay = {state.indicatorPlay}
                winningStatus = {state.winningStatus}
            />
            <div className="game-boxes">
                <div className="menu-bar">
                    <h1>CONNECT<span>4</span></h1>
                </div>
                <Grid boxes = {state.boxes} 
                      halfTopBoxes = {state.halfBoxesTop}
                      AIMoving = {state.AIMoving}
                      filledBox = {state.filledBox}
                      onMouseOut = {(i) => dispatch({ type: "hoverOut", index: i})}
                      onMouseOver = {(i) => dispatch({ type: "hover", index: i})} 
                      onClick = {(i) => dispatch({ type: filler, index: i })}  
                />  
                <div className="menu-bar">
                    <button onClick={()=> dispatch({type: "newGame"})}>NEW GAME</button>
                    <button onClick= {() => dispatch({type: "resetGame"})}>RESET GAME</button>
                </div>
            </div>
            <div className="sidebar two">
                {AiToggle}
                <Sidebar 
                    sidebar = "two"
                    AIOn = {state.AIOn}
                    player1Score = {state.player1Score}
                    player2Score = {state.player2Score}
                    indicatorPlay = {state.indicatorPlay}
                    winningStatus = {state.winningStatus}
                />
            </div>

            {ReactDOM.createPortal(gameResult, document.body)}
        </>     
}

export default GameBox;