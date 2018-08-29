import React, { Component } from 'react';
import logo from '../App/logo.svg';
import '../App/App.css';
import Home2 from '../scenes';
import CounterValue from '../Components/CounterValue'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { jugarPosicion, reset } from '../Components/Reducers/Actions';
import { JUGADORX, JUGADOR0, TABLERO } from '../Components/Constants/index';


class HomeTicTacContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: undefined,
            winnerLine: 'El ganador es el jugador...',
        };
        this.gameState = {
            turn: this.props.turno,
            gameLocked: false,
            gameEnded: false,
            board: this.props.tablero,
            totalMoves: this.props.movimientos,

        };


    }

    clicked(box) {

        if (this.gameState.gameEnded || this.gameState.gameLocked) return;
        this.gameState.turn = this.props.turno
        if (this.gameState.board[box.dataset.square] === '') {
            this.gameState.board[box.dataset.square] = this.gameState.turn;

            box.innerText = this.gameState.turn;

            //this.gameState.turn = this.gameState.turn === 'X' ? 'O' : 'X';
            //this.gameState.turn = this.props.turno
            const board2 = box.dataset.square;
            //const turn2 = this.gameState.turn ;
            const turn2 = this.gameState.turn;
            //const turn2 = this.props.turno === 'X' ? JUGADOR0 : JUGADORX;
            this.gameState.totalMoves++;
            this.props.dispatch(jugarPosicion(board2, turn2));

            console.log(this.props.movimientos);
            console.log(this.props.tablero);

            //this.gameState.totalMoves++;

            this.gameState.gameEnded = false;
            this.setState({
                winner: undefined,
                winnerLine: 'El ganador es el jugador...'
            });
        }

        var result = this.checkWinner();

        if (result === 'X') {
            this.gameState.gameEnded = true;
            this.setState({
                winner: 'X',
                winnerLine: 'El ganador es el jugador X'
            });
        } else if (result === 'O') {
            this.gameState.gameEnded = true;
            this.setState({
                winner: 'O',
                winnerLine: 'El ganador es el jugador O'
            });
        } else if (result === 'draw') {
            this.gameState.gameEnded = true;
            this.setState({
                winner: 'draw',
                winnerLine: 'No hay ganador'
            })
        }

    }

    checkWinner() {
        var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
        var board = this.gameState.board;
        for (let i = 0; i < moves.length; i++) {
            if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
                return board[moves[i][0]];
        }

        if (this.gameState.totalMoves === 9) {
            return 'draw';
        }
    }

    resetCounter = () => {
        var reinicio = window.confirm("¿Quieres reiniciar?");
        if (reinicio === true) {
            // Reseteamos reducers primero ya que estamos desarrollando en paralelo
            this.props.dispatch(reset());

            this.gameState = {
                turn: 'X',
                gameLocked: false,
                gameEnded: false,
                board: Array(9).fill(''),
                totalMoves: 0,
                winner: undefined,
            }

            this.setState({
                winner: undefined,
                winnerLine: 'El ganador es el jugador...'

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
                < div > <CounterValue value={this.gameState} /></div >
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
export default HomeTicTacContainer;