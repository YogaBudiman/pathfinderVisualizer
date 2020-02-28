import React from 'react';
import Start from './Start';
import Finish from './Finish';
import Square from './Square';
import FindPath from './Algorithm.js';
import './Board.css';

const ROWS = 40;
const COLUMNS = 35;
class Board extends React.Component{

    constructor(props){
        super(props);
        this.state={
            squares: [], //id, row, col, isWall, isVisited
            startX: 0,
            startY: 0,
            finishX: 1,
            finishY: 0,
        }
    }


    componentDidMount(){
        const squares = [];
        let id = 0;
        for (let i = 0; i < ROWS; i++){
            for (let j = 0; j < COLUMNS; j++){
                const aSquare = {
                    id: id,
                    row: i,
                    col: j,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    distance: 9999,
                    previous: -1,
                }
                squares.push(aSquare);
                id++;
            }
        }
        console.log(squares);
        this.setState({squares});
    }

    

    RenderSquare(id, x,y, color, [startX,startY], [finishX, finishY]){

        let piece = null;
        if (startX === x && startY === y ){
            piece = <Start/>;
        }else if (finishX ===x && finishY ===y){
            piece = <Finish/>;
        }
        return <div className='squareContainer'><Square id={id} x={x} y={y} color={color} moveDraggable={this.moveDraggable} onClick={this.turnIntoWall}>{piece}</Square></div>
    } 

    moveDraggable = (x,y, type) => {
        
        // TODO implement checking if square preoccupied

        if(type === 'start'){
            this.setState({startX: x, startY:y});
            console.log("ROW: " + x + " COL: " + y );
        }else if (type === 'finish'){
            this.setState({finishX: x, finishY: y});
        }else{
            console.log("ERROR READING TYPE");
        }
        
    }

    turnIntoWall = (id,x,y) => {
        const {startX} = this.state;
        const {startY} = this.state;
        const {finishX} = this.state;
        const {finishY} = this.state;
        const {squares} = this.state;

        if (startX === x && startY === y){
            console.log("ERROR: Can't turn the START point into a wall");
        }else if (finishX === x && finishY === y){
            console.log("ERROR: Can't turn the FINISH point into a wall");
        }else{
            // Check if point is already a wall or not
            // Access 
            if (squares[id].isWall){
                squares[id].isWall = false;
            }else{
                squares[id].isWall = true;
            }
            this.setState({squares});

        }
    }

    restart = () => {
        const squares = [];
        let id = 0;
        for (let i = 0; i < ROWS; i++){
            for (let j = 0; j < COLUMNS; j++){
                const aSquare = {
                    id: id,
                    row: i,
                    col: j,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    distance: 9999,
                    previous: -1,
                }
                squares.push(aSquare);
                id++;
            }
        }
        console.log(squares);
        this.setState({squares});
    }

    // TODO - this method is called by the Algorithm to update the state
    reRender = (squares) => {
        console.log("CALLING METHOD FROM INSIDE BOARD.JS");
        // Set a timeout for this
        this.setState({squares});
    }

    findAPath = () => {
        const {squares} = this.state;
        const {startX} = this.state;
        const {startY} = this.state;
        const {finishX} = this.state;
        const {finishY} = this.state;

        FindPath(squares, startX, startY, finishX, finishY, this.reRender);
    }


    render(){

        const {squares} = this.state;
        const {startX} = this.state;
        const {startY} = this.state;
        const {finishX} = this.state;
        const {finishY} = this.state;

        return(
            <div className="ButtonContainer">
                <button className="RunButton" type="button" onClick={this.findAPath}>Run</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="ResetButton" type="button" onClick={this.restart}>Reset</button>
            <div
            style={{
                width: '1122px',
                height: '1280px',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
            }}
            >
                {squares.map((square, index) =>{
                    const id = square.id;
                    const x = square.row;
                    const y = square.col;
                    let color = !!square.isWall? 'black' : 'white';
                    
                    if (square.isVisited){
                        color = '#16a085';
                    }

                    if (square.isPath){
                        color = '#e74c3c';
                    }
                    return(
                        <div key={square.id}>
                        {this.RenderSquare(id, x,y, color, [startX,startY], [finishX, finishY])}
                        </div>
                    )
                })}

            </div>
            </div>
        )        
    }

}

export default Board;

