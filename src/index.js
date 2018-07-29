import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReduxProvider from './Components/ReduxProvider';


//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<ReduxProvider />, document.getElementById('root'));
registerServiceWorker();
