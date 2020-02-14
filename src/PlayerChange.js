import React from 'react';

const PlayerChange = (props) => {
    //getting the colors from the parent component
    let colors = props.colors;
    let players = props.players;

    const print = players.map((player) => {
        if(player === "player1"){
            return <div className="color-box" key={player} style={{backgroundColor: colors[0]}} onClick = {() => props.onClick(player)}></div>
        } else if (player === "player2"){
            return <div className="color-box" key={player} style={{backgroundColor: colors[1]}} onClick = {() => props.onClick(player)}></div>
        }
        
    })

    
    return <div className="color-container">
                {print}
           </div>
   
}

export default PlayerChange;