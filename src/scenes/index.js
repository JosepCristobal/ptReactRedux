import React from 'react';



const Home2 = () =>
    (
          //<Home2 click={this.clicked} gameState={this.gameState}/>
          < div id = "board" onClick = {(e) => this.clicked(e.target)}>
    <div className="square" data-square="0"></div>
    <div className="square" data-square="1"></div>
    <div className="square" data-square="2"></div>
    <div className="square" data-square="3"></div>
    <div className="square" data-square="4"></div>
    <div className="square" data-square="5"></div>
    <div className="square" data-square="6"></div>
    <div className="square" data-square="7"></div>
    <div className="square" data-square="8"></div>
          </div >);
    
export default Home2;