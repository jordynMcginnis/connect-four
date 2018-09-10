import React, { Component } from 'react';

class Circle extends Component {
  render () {
    return (
      <div className='circle'>
        position: {this.props.position}
        row: {this.props.row}
      </div>
    )
  }
}

export default Circle