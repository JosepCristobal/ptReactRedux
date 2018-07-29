function movimientosReducer(state = 0, action){
switch (action.type){
    case 'JUGAR_POSICION':
        return state +1;
    case 'RESET':
        return 0;
    default:
        return state;
    }
}
export default movimientosReducer;