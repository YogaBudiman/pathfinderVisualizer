//import React from 'react';


const WIDTH = 35;

export default function FindPath(squares, startX, startY, finishX, finishY, reRender){

    dijkstras(squares, startX, startY, finishX, finishY,reRender);
    
    return console.log("Finished computing Dijkstras");

}

const dijkstras = (squares, startX, startY, finishX, finishY,reRender) => {
    
    let index = (startX * WIDTH) + startY;
    squares[index].distance = 0; // Initialize index to 0 distance, all other distance set to infinity (-1) beforehand
    // Initialization of previous square in optimal path from source already done


    let Q = [...squares]; // Q the set of all nodes/squares in the grapth that are unoptimized 

    let run = true;
    while (Q.length >= 1 && run){

        let index = findMin(Q); // Find index of node in Q with smallest distance
        let U = Q[index]; // Extract min from Q
        Q.splice(index,1); // remove min node from the array Q
        //console.log("The size of Q is: " + Q.length + "/ The index is: " + index + "/ The U is: " + U);

        let neighbours = findNeighbours(squares, U);

        // Visit each neighbour V of U
        for (let i = 0; i < neighbours.length; i++){
            let tempDistance = U.distance + 1 // !!! IMPORTANT Edge weight is always 1
            if (tempDistance < neighbours[i].distance){
                // Update distance in squares array
                squares[neighbours[i].id].distance = tempDistance;
                squares[neighbours[i].id].previous = U.id;
                squares[neighbours[i].id].isVisited = true;
                
                let row = squares[neighbours[i].id].row;
                let col = squares[neighbours[i].id].col;
                if (row === finishX && col === finishY){
                    run = false;
                    squares = markPath(finishX, finishY, squares);
                }
            }

        }
        // TODO Create a pause here
        //setTimeout(reRender, 4000, squares);
        reRender(squares);
        
    }
    
    console.log(squares);
    
    
}



const markPath = (finishX, finishY,squares) => {

    let index = (finishX * WIDTH) + finishY;
    let run = true;
    while (run){

        // Update index isPath flag to true
        squares[index].isPath = true;
        index = squares[index].previous;
        if (squares[index].previous === -1){
            run = false;
        }
    }

    return squares;

}


// Used to locate minimum distance
// Q = array 
const findMin = (Q) => {
    let min = 10000; // set min to arbitrarily large value
    let index = 1;
    for (let i=0; i < Q.length; i++){
        if (Q[i].distance < min){
            index = i;
            min = Q[i].distance;
        }
    }
    return index;
}



// Locate neighbours and return array of neighbours
// Squares = array of all nodes/squares
// U = node we are trying to find neighbours of
const findNeighbours = (squares, U) => {

    let neighbours = [];
    const row = U.row;
    const col = U.col;


    //console.log("Index is:" + ((col * WIDTH) + (row - 1)));
    
    if (row - 1 >= 0){
        const topIndex = ((row-1) * WIDTH) + (col);
        //console.log("Trying to access index " + topIndex);

        if(!squares[topIndex].isWall){
            neighbours.push(squares[topIndex]);
        }
    }

    // Check bottom square
    if ((row + 1) <= 39){
        const bottomIndex = ((row + 1) * WIDTH) + (col);
        if(!squares[bottomIndex].isWall){
            neighbours.push(squares[bottomIndex]);
        }
    }

    // Check right square
    if ((col+1) <= 34){
        const rightIndex = (row * WIDTH) + (col + 1);
        if(!squares[rightIndex].isWall){
            neighbours.push(squares[rightIndex]);
        }
    }

    // Check left square
    if ((col - 1) >= 0){
        const leftIndex = (row * WIDTH) + (col-1);
        if(!squares[leftIndex].isWall){
            neighbours.push(squares[leftIndex]);
        }
    }


    return neighbours;
    
}

