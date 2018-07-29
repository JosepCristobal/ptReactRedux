
export function jugarPosicion (pos, turno) {
    return{
    type: 'JUGAR_POSICION',
    pos: pos,
    turno: turno,
    }
}

export function reset(){
    return {type : 'RESET'}
}
