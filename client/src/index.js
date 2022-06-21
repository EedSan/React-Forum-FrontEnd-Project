import {Provider} from 'react-redux';
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './storing/configureStore';

ReactDOM.render(<StrictMode>
    <Provider store={store}> <App/> </Provider>
</StrictMode>, document.getElementById('root'));

serviceWorker.unregister();