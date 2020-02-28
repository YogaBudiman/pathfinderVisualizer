import React from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import Backend from 'react-dnd-html5-backend';
import Board from './components2/Board';


function App() {

  return (
    <div className="App">
      <DndProvider backend={Backend}>
      <div className="TopBar">
      <h1 className="Title">Pathfinder Visualizer</h1>
      <p className="Instructions">Instructions: Move the person and sushi on the board. Press the tiles to turn them into walls</p>
      </div> 
      <div className="Board">
      <Board/>
      </div>
      </DndProvider>
    </div>
  );
}

export default App;

