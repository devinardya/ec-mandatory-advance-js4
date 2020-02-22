import React from 'react';
import { aiMoving} from './aiMoving';

// function component needs to have props as argument if they want to be passed something from the parent component
const Grid = (props) => {
    let boxes = props.boxes;
    let halfBoxesTop = props.halfTopBoxes;
    let AIindexTemp; 
/* 
        if (props.AIMoving){
            setTimeout( ()=> {
                AIindexTemp = Math.floor(Math.random() * Math.floor(6));
                console.log("AI INdex", AIindexTemp)
            }, 500);  
        }  */
/*     AIindexTemp = Math.floor(Math.random() * Math.floor(6))

    let allFilledBoxAI = [...props.filledBox];
    console.log(allFilledBoxAI)
    while (allFilledBoxAI.includes(AIindexTemp) && AIindexTemp>= 0 ) {

    if (AIindexTemp < 0) {
        AIindexTemp  = Math.floor(Math.random() * Math.floor(6))
    }
    }
   */
     AIindexTemp = aiMoving();

    //console.log('grid triggerd');
    
    const print = boxes.map((box, index) => {
        let playIndex;

       if (props.AIMoving){
            playIndex = AIindexTemp;
        } else {
            playIndex = index;
        }
        


        //console.log(box);
        // on the onClick function, it pass the current index of the array to the parent component by putting it as the argument on the props.onClick
        return <div style={{ backgroundColor: box }} 
                    className="box" 
                    onClick={() => props.onClick(playIndex)} 
                    //onClick={() => props.onClick(AIindex)} 
                    onMouseOut={() => props.onMouseOut(index)} 
                    onMouseOver={() => props.onMouseOver(index)} 
                    key={index}></div>
    })
    
    // to print the half circle on top of the box
    const halfDisk = halfBoxesTop.map((halfbox,index) => {
        return <div style={{ backgroundColor: halfbox }} 
                    className="halfbox" 
                    key={index}></div>
    })


    return <>
                <div className="halfbox-container">
                    {halfDisk}
                </div>
                <div className="container">
                    {print}
                </div>
            </>
}

export default Grid;