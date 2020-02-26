function aiMoving(array) {

    let AIindexTemp;
   // let allFilledBoxAI = statusArray;
    console.log("aimoving")
    let allFilledBox = array;

    AIindexTemp = Math.floor(Math.random() * Math.floor(6))
    if (array !== undefined){
        while (allFilledBox.includes(AIindexTemp)) {
            AIindexTemp -= 7;
        }
        
        if (AIindexTemp < 0) {
            AIindexTemp  = Math.floor(Math.random() * Math.floor(6))
        }
    }
    
 

    return AIindexTemp;
   /*      AIindexTemp = Math.floor(Math.random() * Math.floor(6))

        if (AIindexTemp < 0) {
            AIindexTemp  = Math.floor(Math.random() * Math.floor(6))
        }
       
        return AIindexTemp; */
}

export {aiMoving};

