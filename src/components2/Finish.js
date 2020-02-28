import React from 'react';
import {ItemTypes} from './Constants';
import {useDrag} from 'react-dnd';

export default function Finish(){

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.FINISH},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return(
        <div
            ref={drag}
            style={{
                opacity: isDragging? 0.5:1,
                fontWeight: 'bold',
                fontSize: '25',
                cursor: 'pointer',
            }}
        >
            O
        </div>
    ) 
}