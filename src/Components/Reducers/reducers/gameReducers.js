import {JUGADORX, JUGADOR0, TABLERO} from '../../Constants';

function gameReducer(state = TABLERO, action){
    switch (action.type) {
        case 'JUGAR_POSICION':
            let nuevoValor = action.turno === JUGADORX ? 'X': '0';
            let newState = JSON.parse(JSON.stringify(state))
            newState[action.pos] = nuevoValor;
            return newState;

        case 'RESET':
            return TABLERO;
        default:
            return state;
    }
}
export default gameReducer;