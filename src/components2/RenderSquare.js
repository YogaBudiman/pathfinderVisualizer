import React from 'react';
import Start from './Start';
import Finish from './Finish';
import Square from './Square';

export default function RenderSquare(x,y, [startX,startY], [finishX, finishY]){

    let piece = null;
    if (startX === x && startY === y ){
        piece = <Start/>;
    }else if (finishX ===x && finishY ===y){
        piece = <Finish/>;
    }
    return <Square>{piece}</Square>
} 