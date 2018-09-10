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
    };
  }
  render () {
    return (
      <div className='grid'>
        {this.state.grid.map((row, index) => {
          let rIndex = index;
          return row.map((circle, index) => <Circle key={index} column={index} row={rIndex}/>)
        })}
      </div>
    );
  }
}

export default Grid