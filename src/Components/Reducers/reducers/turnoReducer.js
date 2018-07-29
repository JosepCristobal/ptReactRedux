import {JUGADORX, JUGADOR0} from '../../Constants';

function turnoReducer(state = JUGADORX, action){
    switch (action.type){
        case 'JUGAR_POSICION':
        return action.turno === JUGADORX ? JUGADOR0 : JUGADORX;

        case 'RESET':
            return JUGADORX;
        default:
            return state;
    }
}
export default turnoReducer;
