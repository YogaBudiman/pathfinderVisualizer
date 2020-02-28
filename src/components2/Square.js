import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

export default  function Square({id, x,y,color, children, moveDraggable, onClick}){
    const fill = color;
    const index = id;
    const row = x;
    const col = y;
    
    const [, drop] = useDrop({
        accept: [ItemTypes.FINISH, ItemTypes.START],
        drop: (item, monitor) => ({
            drop: moveDraggable(x,y, monitor.getItemType()),
        }),
    })
    

    const changeSquare = () => {
        onClick(index,row,col);
    }

    return(
        <div

        ref={drop}
        
        onClick={changeSquare}

        style={{
            backgroundColor: fill,

            width: '30px',
            height: '30px',
            border: '1px solid #95a5a6',
            flex: '1',

            
            
        }}>
            {children}
        </div>

    )

}