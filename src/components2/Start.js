import React from 'react';
import {ItemTypes} from './Constants';
import {useDrag} from 'react-dnd';
import Critter from './images/male.gif'

export default function Start(){

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.START},
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
            <img src={Critter} alt="V"/>
        </div>
    ) 
}