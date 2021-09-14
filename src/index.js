import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.scss';


import reducer from "./Store/Reducer";
import { combineReducers } from "redux";

// The key of this object will be the name of the store
const rootReducers = combineReducers({ list: reducer });

export default rootReducers;


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);