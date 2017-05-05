import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import rootReducer from "./reducer/reducer.js";
import Router from "./config/router"
import './css/index.css';
import checkLogin from "./plugin/checkLogin";
const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( rootReducer, composeEnhancers(
	applyMiddleware( ...middleware )
));

// checkLogin();//检查登录

ReactDOM.render( 
	 <Provider store={ store } >
		{ Router }	
	</Provider>,
  	document.getElementById('root')
);
 