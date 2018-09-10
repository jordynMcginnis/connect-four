import React, { Component } from 'react';

class Circle extends Component {
  constructor(props){
    super(props)
    this.selectCircle = this.selectCircle.bind(this);
  }
  selectCircle() {
    this.props.handleClick(this.props.column)
  }
  render () {
    return (
      <div className={this.props.style} onClick={this.selectCircle}>
        column: {this.props.column}
        row: {this.props.row}
        {this.props.style}
      </div>
    )
  }
}

export default Circle