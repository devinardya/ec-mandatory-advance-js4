
function checkWinner(boxes){

    // check winner based on horizontal position

    for (let j = 0; j <=5; j ++){
    	
        // loop for 4 first positions of a new row
        for (let k = 0; k <= 3; k++){
            let i = j*7+k;		// position to check
        
         if(boxes[i] === boxes[i+1] && boxes[i] === boxes[i+2] && boxes[i] === boxes[i+3] && boxes[i] !== "white"){
              if(boxes[i] === "pink"){
                  return "one";
              } else if (boxes[i] === "grey"){
                  return "two";
              }
          }
        
        }
        
    }

    // check winner based on vertical position

      // loop over the top 3 rows
    for (let j = 0; j <= 2; j++) {

    // loop for all positions in a row
        for (let k = 0; k <= 6; k++) {
        let i = j * 7 + k; // position to check

        if (boxes[i] === boxes[i + 7] && boxes[i] === boxes[i + 2*7] && boxes[i] === boxes[i + 3*7] && boxes[i] !== "white") {
            if(boxes[i] === "pink"){
                return "one";
            } else if (boxes[i] === "grey"){
                return "two";
            }
        }
    }
  }
}

export {checkWinner};