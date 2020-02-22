function aiMoving() {

    let AIindexTemp;
   // let allFilledBoxAI = statusArray;
    console.log("aimoving")

 
        AIindexTemp = Math.floor(Math.random() * Math.floor(6))

        if (AIindexTemp < 0) {
            AIindexTemp  = Math.floor(Math.random() * Math.floor(6))
        }
       
        return AIindexTemp;
}

export {aiMoving};