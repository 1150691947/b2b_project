import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as actions from "./action/action";
import injectTapEventPlugin from 'react-tap-event-plugin';
// import { RouteTransition } from 'react-router-transition';
import './css/App.css';
// <RouteTransition
//   pathname={this.props.location.pathname}
//   atEnter={{ translateX: 100,display:"block" }}
//   atLeave={{ translateX: -100,display:"none" }}
//   atActive={{ translateX: 0 }}
//   mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
// >
//   {childrenWithProps}
// </RouteTransition>
injectTapEventPlugin();//添加TAP响应
class App extends Component {
  componentDidMount(){
    const  loadingDiv = document.getElementById("loadingDiv");
    loadingDiv.className += " hide";
    document.body.style.overflow = "visible";
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
        (child) => cloneElement(child, {...this.props,key:this.props.pathname})
    );
    
    return (
      <div className="App">
          {childrenWithProps}
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
  