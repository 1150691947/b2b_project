import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as actions from "./action/action.js";

import './css/App.css';


class App extends Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
        (child) => cloneElement(child, {...this.props,key:this.props.pathname})
    );

    console.log( React.Children )

    return (
      <div className="App">
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example" 
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
        >
          {childrenWithProps}
        </ReactCSSTransitionGroup>     
      </div>
    ); 
  }
}
 
const mapDispatchToProps =  ( dispatch )  => ({
		actions : bindActionCreators( actions, dispatch )
})
 

const mapStateToProps = ( state ) => {
  return { 
    ...state
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
  