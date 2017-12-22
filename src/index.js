import React from 'react';
import ReactDOM from 'react-dom';
import './css/all.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App route="index" />, document.getElementById('root'));
registerServiceWorker();
