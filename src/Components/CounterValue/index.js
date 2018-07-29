import React from 'react'
import PropTypes from 'prop-types';

const CounterValue = ({ value }) => (
    <div center>
        El valor de movimentos es:
    {' '}
        <b>
            {value.totalMoves}
        </b>
        <div center>
            Turno para Jugador:
         {' '}
            <b>
                {value.turn}
            </b>
        </div>
    </div>
);

CounterValue.defaultProps = {
    value1: 0,
};

CounterValue.propTypes = {
    value1: PropTypes.number,
};
CounterValue.defaultProps = {
    value2: "X",
};

CounterValue.propTypes = {
    value2: PropTypes.string,
};
export default CounterValue;