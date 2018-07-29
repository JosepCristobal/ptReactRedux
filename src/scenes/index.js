import React from 'react';
import { Box } from 'rebass';



const Home2 = ({ click, gameState }) =>
    (<Box>
        <div id="game">
            <div id="board" onClick={(e) => click(e.target)}>
                <div className="square" data-square="0"></div>
                <div className="square" data-square="1"></div>
                <div className="square" data-square="2"></div>
                <div className="square" data-square="3"></div>
                <div className="square" data-square="4"></div>
                <div className="square" data-square="5"></div>
                <div className="square" data-square="6"></div>
                <div className="square" data-square="7"></div>
                <div className="square" data-square="8"></div>
            </div>
        </div>
    </Box>);


export default Home2;