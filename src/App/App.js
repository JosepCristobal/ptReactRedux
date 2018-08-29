import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home2 from '../scenes';
import CounterValue from '../Components/CounterValue'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { jugarPosicion, reset } from '../Components/Reducers/Actions';
import { JUGADORX, JUGADOR0, TABLERO } from '../Components/Constants/index';
import HomeTicTacContainer from '../Components/HomeTicTacContainer'


class App extends Component {
  constructor(props) {
    super(props);
    this.State = {
      turn: this.props.turno,
      board: this.props.tablero,
      totalMoves: this.props.movimientos,
    };
    this.gameState = {
      winner: undefined,
      winnerLine: 'El ganador es el jugador...',
      gameLocked: false,
      gameEnded: false,
    };


  }

  clicked(box) {

    if (this.gameState.gameEnded || this.gameState.gameLocked) return;
      this.State.turn = this.props.turno
    if (this.State.board[box.dataset.square] === '') {
      this.State.board[box.dataset.square] = this.gameState.turn;

      box.innerText = this.State.turn;

      //this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X';
      //this.gameState.turn = this.props.turno
      const board2 = box.dataset.square;
      //const turn2 = this.gameState.turn ;
      const turn2 = this.State.turn ;
      //const turn2 = this.props.turno === 'X' ? JUGADOR0 : JUGADORX;
      this.State.totalMoves++;
      this.props.dispatch(jugarPosicion(board2, turn2));
      //mapStateToProps()
      console.log(this.props.movimientos);
      console.log(this.props.tablero);
      console.log(this.State.board);
    
      //this.gameState.totalMoves++;

      this.gameState.gameEnded = false;
      /*this.setState({
        winner: undefined,
        winnerLine: 'El ganador es el jugador...'
      });*/
    }

    var result = this.checkWinner();

    if (result === 'X') {
      this.gameState.gameEnded = true;
      this.setgameState({
        winner: 'X',
        winnerLine: 'El ganador es el jugador X'
      });
    } else if (result === 'O') {
      this.gameState.gameEnded = true;
      this.setgameState({
        winner: 'O',
        winnerLine: 'El ganador es el jugador O'
      });
    } else if (result === 'draw') {
      this.gameState.gameEnded = true;
      this.setgameState({
        winner: 'draw',
        winnerLine: 'No hay ganador'
      })
    }

  }

  checkWinner() {
    var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.State.board;
    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
        return board[moves[i][0]];
    }

    if (this.State.totalMoves === 9) {
      return 'draw';
    }
  }

  resetCounter = () => {
    var reinicio = window.confirm("¿Quieres reiniciar?");
    if (reinicio === true) {
      // Reseteamos reducers primero ya que estamos desarrollando en paralelo
      this.props.dispatch(reset());
      
      this.State = {
        turn: 'X',
        board: Array(9).fill(''),
        totalMoves: 0,
       
      }

      this.setgameState({
        winner: undefined,
        winnerLine: 'El ganador es el jugador...',
        gameLocked: false,
        gameEnded: false,
      });

      for (let i = 0; i <= 8; i++) {
        document.querySelectorAll('.square')[i].innerText = ''
      }
    }
  }


  render() {

    return (
      <div id="game">

        <div id="head">
          Tres en raya
        </div>
        {
          //<Home2 click={this.clicked} gameState={this.gameState}/>
          <div id="board" onClick={(e) => this.clicked(e.target)}>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>}
        < div > <CounterValue value={this.State} /></div >
        <div id="status">{this.state.winnerLine}</div>
        <button type="button" onClick={this.resetCounter}>
          Reiniciar
      </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movimientos: state.movimientos,
    tablero: state.tablero,
    turno: state.turno

  };
}
//export default App;
export default connect(mapStateToProps)(App);
