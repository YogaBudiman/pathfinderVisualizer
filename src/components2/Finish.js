import React from 'react';
import {ItemTypes} from './Constants';
import {useDrag} from 'react-dnd';
import Sushi from './images/sushi.png';

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
            <img src={Sushi} alt="O"/>
        </div>
    ) 
}