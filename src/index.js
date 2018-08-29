import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ReduxProvider from './Components/ReduxProvider';

ReactDOM.render(<ReduxProvider />, document.getElementById('root'));
registerServiceWorker();
