import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
