import React from 'react';


// function component needs to have props as argument if they want to be passed something from the parent component
const Grid = (props) => {
    let boxes = props.boxes;
    let halfBoxesTop = props.halfTopBoxes;
 
    
    const print = boxes.map((box, index) => {

        //console.log(box);
        // on the onClick function, it pass the current index of the array to the parent component by putting it as the argument on the props.onClick
        return <div style={{ backgroundColor: box }} 
                    className="box" 
                    onClick={() => props.onClick(index)} 
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