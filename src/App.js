import React, { Component } from 'react';
import './App.css';




class Layout extends Component {

  render () {
    var plyr1points = localStorage.getItem('p1points');
    var plyr2points = localStorage.getItem('p2points');
    var selectBox = Object.keys(this.props.board[0])
      .map(function (item) {
        return parseInt(item, 10)
      });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Connect Four</h2>
        </div>
        <div className="App-intro">
          <button className='restart' onClick={this.props.reset}>Reset</button>
          <div className='restart-top'>
          <div className='player-one'>
            Player One Points: <p> {plyr1points} </p>
          </div>

          <div className = 'player'> {this.props.playersTurn === 'playerOne'
                ? <p> Player One's Turn! </p>
                : <p> Player Two's turn </p>
              }
          </div>
          <div className='player-two'>
              Player Two Points:<p> {plyr2points}</p>
          </div>
          </div>

          <div className='board-container'>
            <ul className='select' >
              {this.props.playersTurn === 'playerOne'
                ? selectBox.map(function(number){
                    return <li className = 'selectBoxPlayer1' onClick={this.props.fillInBox.bind(null, number)} key={number}></li>
                  }.bind(this))
                : selectBox.map(function(number){
                    return <li className = 'selectBoxPlayer2' onClick={this.props.fillInBox.bind(null, number)} key={number}> </li>
                  }.bind(this))
              }
              {this.props.board.map(function(column, index){
                return (
                  <ul key={index} className = 'row'>
                    {column.map(function(item, index){
                      if (item === 'playerTwo') {
                        return (
                           <li className='each2' key={index} />
                        )
                      } else if (item === 'playerOne') {
                        return (
                          <li className='eachp' key={index} />
                        )
                      } else {
                        return (
                          <li className='each' key={index} />
                        )
                      }
                    })}
                  </ul>
                )
              })}
            </ul>
          </div>

        </div>
      </div>
    )
  }
}

function createInitialBoard () {
  var result = [];
  for(var i = 0; i < 6; i++){
    result.push([null, null, null, null, null, null, null])
  }

  return result
}

class Main extends Component {
  constructor (props){
    super(props);
    this.state = {
      playerOnePoints: 0,
      playerTwoPoints: 0,
      playersTurn: 'playerOne',
      board: createInitialBoard(),
      winner: ''
    }

    this.fillInBox = this.fillInBox.bind(this);
    this.getRow = this.getRow.bind(this);
    this.reset = this.reset.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.checkHorizontally = this.checkHorizontally.bind(this);
    this.checkVertically = this.checkVertically.bind(this);
    this.checkDiagonally = this.checkDiagonally.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  reset () {
    this.setState(function (){
      return {
        playersTurn: 'playerOne',
        playerTwoPoints: 0,
        playerOnePoints: 0,
        board: createInitialBoard(),
        winner: ''
      }
    })
    localStorage.removeItem('p2points');
    localStorage.removeItem('p1points');

  }
  newGame () {
    this.setState(function (){
      return {

        board: createInitialBoard(),
        winner: ''
      }
    })
     localStorage.setItem('p1points', this.state.playerOnePoints);
      localStorage.setItem('p2points', this.state.playerTwoPoints);
  }
  getRow (column) {
    var board = this.state.board;
    var lastRow = board.length - 1;

    for (var i = lastRow; i >= 0; i--) {
      if (board[i][column] === null) {
        return i;
      }
    }
  }
  fillInBox (column) {

    var board = this.state.board;

    var rowIndex = this.getRow(column);
    var playersTurn = this.state.playersTurn;

    if (typeof rowIndex === 'undefined') {
      return
    }

    var newBoard = board.map(function(row, index){
      if(rowIndex === index){
        return row.map(function(item, i){
          if(column === i){
            return playersTurn;
          } else {
            return item;
          }
        })
      } else {
        return row;
      }
    })

    this.setState(function (state) {
      return {
        board: newBoard,
        playersTurn: state.playersTurn === 'playerOne'
          ? 'playerTwo'
          : 'playerOne'
      }
    })
      console.log(this.checkWin(newBoard, column, rowIndex))
      }
  checkHorizontally (board, rowIndex) {
    var row = board[rowIndex]
    for(var j = 0; j < row.length; j++){
      if(row[j] !== null){
        if(row[j] === row[j + 1] && row[j] === row[j + 2] && row[j] === row[j + 3]){
          return true
        }
      }
    }
     return false
  }
  checkVertically (board, column) {
    var col = [];
    for(var i = 0; i < board.length; i++){
      col.push(board[i][column])
    }


    for(var j = col.length - 1; j >= 0; j--){
      if(col[j] === null){
        return false
      } else if (col[j] === col[j - 1] && col[j] === col[j - 2] && col[j] === col[j - 3]){
        return true
      }
    }

    return false
  }
  checkDiagonally (board) {

    var arr = [
      [board[0][3],board[1][2],board[2][1], board[3][0]],
      [board[0][4],board[1][3],board[2][2], board[3][1], board[4][0]],
      [board[0][5],board[1][4],board[2][3], board[3][2], board[4][1], board[5][0]],
      [board[0][6],board[1][5],board[2][4], board[3][3], board[4][2], board[5][1]],
      [board[1][6],board[2][5],board[3][4], board[4][3], board[5][2]],
      [board[2][6],board[3][5],board[4][4], board[5][3]],
      [board[0][3],board[1][4],board[2][5], board[3][6]],
      [board[0][2],board[1][3],board[2][4], board[3][5], board[4][6]],
      [board[0][1],board[1][2],board[2][3], board[3][4], board[4][5], board[5][6]],
      [board[0][0],board[1][1],board[2][2], board[3][3], board[4][4], board[5][5]],
      [board[1][0],board[2][1],board[3][2], board[4][3], board[5][4]],
      [board[2][0],board[3][1],board[4][2], board[5][3]],
    ]
    for(var i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i]) === true){
        var row = arr[i];
        for(var j = row.length-1; j >= 0; j--){
          if(row[j] !== null){
           if(row[j] === row[j - 1] && row[j] === row[j - 2] && row[j] === row[j - 3]){
              return true
            }
          }
        }
      }
    }
  }


  checkWin (board, column, rowIndex) {
    var horizontalWinner = this.checkHorizontally(board, rowIndex)
    var verticalWinner = this.checkVertically(board, column)
    var diagonalWinner = this.checkDiagonally(board)
    if (horizontalWinner === true || verticalWinner === true || diagonalWinner === true) {
      if(this.state.playersTurn === 'playerOne'){
        var point = this.state.playerOnePoints
        this.setState(function(){
          return {
            winner: this.state.playersTurn,
            playerOnePoints: point + 1
          }
        })

      } else {
        var point = this.state.playerTwoPoints
      this.setState(function(){
        return {
          winner: this.state.playersTurn,
          playerTwoPoints: point + 1
        }
      })

    }
    }
  }

  render () {
    return (
      <div>
        <Layout
          playerOne={this.state.playerOnePoints}
          playerTwo={this.state.playerTwoPoints}
          playersTurn={this.state.playersTurn}
          fillInBox={this.fillInBox}
          board={this.state.board}
          reset={this.reset}
        />
        <div >
          {this.state.winner !== ''
            ? <div className='winner'>
                <p> Winner: {this.state.winner}
                   <button onClick={this.newGame}> New Game</button>
                </p>
              </div>
            : null
          }
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

export default App;
