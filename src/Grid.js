import React from 'react';

// function component needs to have props as argument if they want to be passed something from the parent component
const Grid = (props) => {
    let boxes = props.boxes;
    const print = boxes.map((box, index) => {
        //console.log(box);
        // on the onClick function, it pass the current index of the array to the parent component by putting it as the argument on the props.onClick
        return <div style={{ backgroundColor: box }} className="box" onClick={() => props.onClick(index)} key={index}></div>
    })
    return <div className="container">
                {print}
           </div>
   
}

export default Grid;