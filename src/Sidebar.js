import React from 'react';

const Sidebar = React.memo( (props) => {
    

    let indicatorColor1, indicatorColor2, winScore1, winScore2, printData;
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

     // to control the color of the winner scores 

   if (props.player1Score > props.player2Score) {
       console.log("it's here")
       winScore2 = {color: "grey"};
       winScore1 = {color: "rgb(255, 126, 148)"};
   } else if (props.player1Score < props.player2Score) {
       winScore2 = {color: "rgb(255, 126, 148)"};
       winScore1 = {color: "grey"};
   } else {
       winScore2 = {color: "grey"};
   }


   if (props.sidebar === "one"){
       printData = (<div className="sidebar one">
                        <div className= {indicatorColor1}></div>
                        <h2>Player 1</h2>
                        <h1 style={winScore1}>{props.player1Score}</h1>
                    </div>)
   } 
   
   if (props.sidebar === "two") {
       printData = (<div className="score-display">
                        <div className= {indicatorColor2}></div>
                        <h2>Player 2</h2>
                        <h1 style={winScore2}>{props.player2Score}</h1>
                    </div>  )
   }

    return  <>
              {printData}
            </>
});

export default Sidebar;