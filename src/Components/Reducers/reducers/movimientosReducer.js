function movimientosReducer(state = 0, action){
switch (action.type){
    case 'JUGAR_POSICION':
        return state +1;
    default:
        return state;
    }
}
export default movimientosReducer;