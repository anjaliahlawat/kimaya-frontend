import React from 'react';
import { Provider } from 'react-redux';
import Router from "./component/RouterComponent";
import configureStore from './store/configureStore'
import './sass/App.scss';
import 'react-toastify/dist/ReactToastify.css';

// const store = configureStore()

function App() {
  return (
    // <Provider store={store}>
        <Router />
    // </Provider>
  );
}

export default App;
