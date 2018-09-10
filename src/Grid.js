import React, { Component } from 'react';
import Circle from './Circle.js';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
      ],
      turn: 'red'
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
  }
  handleClick (column) {
    let newGrid = this.state.grid;
    let newTurn = this.state.turn === 'red' ? 'blue' : 'red';
    let finalRow = false;
    let finalPlayer = false;
    for(var i = 5; i >= 0; i--) {
      if(newGrid[i][column] === false){
        newGrid[i][column] = this.state.turn;
        finalRow = i;
        finalPlayer = this.state.turn;
        this.setState(() => ({grid : newGrid, turn : newTurn}))
        this.checkWinner(column, finalRow, finalPlayer);
        return;
      }
    }
  }
  checkWinner (column, row, player) {
    //checks vertically
    let winner = true;
    if(row <= 2){
      for(var i = 0; i < 4; i++) {
        if(this.state.grid[row + i][column] !== player){
          winner = false;
          return;
        }
        // if(this.state.grid[row][column + i] !== player){
        //   winner = false;
        //   return;
        // }
      }
    } else {
      winner = false;
    }
    //check horizontally

    let count = 0;
    for(var i = 0; i < this.state.grid[row].length; i++){
      if(this.state.grid[row][i] === player){
        count += 1;
        if(count >= 4){
          winner = true
          alert('winner')
          return;
        }
      } else {
        count = 0;
        winner = false
      }
    }
    winner === true ? alert('winner') : null
     //check diagonally

  }
  render () {
    return (
      <div className='grid'>
        {this.state.grid.map((row, index) => {
          let rIndex = index;
          return row.map((circle, index) => <Circle style={circle || 'empty'} key={index} column={index} row={rIndex} player={this.state.player} handleClick={this.handleClick}/>)
        })}
      </div>
    );
  }
}

export default Grid