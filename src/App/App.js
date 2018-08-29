import React, { Component } from 'react';
import './App.css';
import CounterValue from '../Components/CounterValue'
import { connect } from 'react-redux';
import { jugarPosicion, reset } from '../Components/Reducers/Actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.gameState = {
      gameLocked: false,
      gameEnded: false,
      winner: undefined,
      winnerLine: 'El ganador es el jugador...',
    }; 
  }
 
  clicked(box) {

    if (this.gameState.gameEnded || this.gameState.gameLocked) return;
    
    if (this.props.tablero[box.dataset.square] === '') {

      box.innerText = this.props.turno;
      const board2 = box.dataset.square;  
      this.props.dispatch(jugarPosicion(board2, this.props.turno));
      this.gameState.gameEnded = false;
      this.gameState.winner = '';
      this.gameState.winnerLine = 'El ganador es el jugador...';
     
    }

  }

  textWinner(){
    var result = this.checkWinner();
    
    if (result === 'X') {
      this.gameState.gameEnded = true;
      this.gameState.winner = 'X';
      this.gameState.winnerLine = 'El ganador es el jugador X';

      } else if (result === '0') {
      this.gameState.gameEnded = true;
      this.gameState.winner = '0';
      this.gameState.winnerLine = 'El ganador es el jugador 0';

    } else if (result === 'draw') {
      this.gameState.gameEnded = true;
      this.gameState.winner = 'draw';
      this.gameState.winnerLine = 'No hay ganador';
        
    }
      
  }

  checkWinner() {
    const moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const board = this.props.tablero;
    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
        return board[moves[i][0]];
    }

    if (this.props.movimientos === 9) {
      return 'draw';
    }
  }

  resetCounter = () => {
    var reinicio = window.confirm("¿Quieres reiniciar?");
    if (reinicio === true) {
      this.props.dispatch(reset());
      
      this.gameState = {
        gameLocked: false,
        gameEnded: false,
      }
      this.gameState.winner = '';
      this.gameState.winnerLine = 'El ganador es el jugador...';

      for (let i = 0; i <= 8; i++) {
        document.querySelectorAll('.square')[i].innerText = ''
      }
    }
  }

  render() {
    const valor = {
      totalMoves: this.props.movimientos,
      turn: this.props.turno,
    };
    console.log(this.props.movimientos);
    console.log(this.props.tablero);
    this.textWinner();
    return (
      
      <div id="game">

        <div id="head">
          Tres en raya
        </div>
        {
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
        < div > <CounterValue value={valor} /></div >
        <div id="status">{this.gameState.winnerLine}</div>
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

export default connect(mapStateToProps)(App);
