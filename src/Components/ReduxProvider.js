import { Provider} from 'react-redux';
import GlobalState from './Reducers/reducers';
import {createStore} from 'redux';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import {JUGADORX, TABLERO} from './Constants';
import App from '../App';

export default class ReduxProvider extends React.Component{

        constructor(props){
            super(props);
            this.initialState = {tablero: TABLERO, turno: JUGADORX, movimientos:0};
            this.store = this.configureStore();
        }

        render(){
            return(
                <AppContainer>
                    <Provider store = {this.store}>
                        <div style={{ height: '100%'}}>
                    <App store = {this.store} />
                    
                        </div>
                    </Provider>
                </AppContainer>
            );
        }
    configureStore(){
        const store = createStore(GlobalState, this.initialState);
        if (module.hot){
            module.hot.accept('../Components/Reducers/reducers', () => {
                const nextRootReducer = require('../Components/Reducers/reducers').default;
                store.replaceReducer(nextRootReducer);
            });
        }
        return store;
    }
}