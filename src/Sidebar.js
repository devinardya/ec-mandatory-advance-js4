import React from 'react';
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const Sidebar = (props) => {
    

    let indicatorColor1, indicatorColor2, AiToggle, winScore1, winScore2, sideClassName;
    // to control the toggle of the dot color to show which player is active                                   
   if (props.indicatorPlay){
       indicatorColor1 = "indicator-dot red";
       indicatorColor2 = "indicator-dot";            
   } else {
       indicatorColor1 = "indicator-dot";
       indicatorColor2 = "indicator-dot red";
   }     
   
   // if someone is winning, then reset the dot color to grey and show the winner announcement box
   if (props.winningStatus){
       indicatorColor1 = "indicator-dot";
       indicatorColor2 = "indicator-dot"; 
   } /* else {
       gameResult = "game-result";
   } */

   if (props.player1Score > props.player2Score) {
       winScore2 = {color: "grey"};
       winScore1 = {color: "rgb(255, 126, 148)"};
   } else if (props.player1Score < props.player2Score) {
       winScore2 = {color: "rgb(255, 126, 148)"};
       winScore1 = {color: "grey"};
   } else {
       winScore2 = {color: "grey"};
   }

   if (props.classNameText === "sidebar one") {
        sideClassName = "sidebar one";
   } else {
        sideClassName = "sidebar two";
      
   }

    return  (<div className={sideClassName}>
                <div className= {indicatorColor1}></div>
                {AiToggle}
                <h2>Player 1</h2>
                <h1 style={winScore1}>{props.player1Score}</h1>
                <p>{props.winnerText1}</p>
             </div>)
}

export default Sidebar;