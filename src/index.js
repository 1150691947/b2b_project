import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';

import rootReducer from "./reducer/reducer.js";

import Router from "./config/router"


import './css/index.css';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore( 
	rootReducer, 
	applyMiddleware( ...middleware ) 
);

ReactDOM.render(
	<Provider store={ store } >
		{ Router }	
	</Provider>,
  	document.getElementById('root')
);
   