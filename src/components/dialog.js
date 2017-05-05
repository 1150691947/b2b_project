import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class DialogComponent extends Component {
  handleTap = ()=>{
  	this.props.onRequestClose() 
  } 
  render() {
    const standardActions = (
      <FlatButton 
        label="确定"
        primary={true}
        fullWidth={true}
        onTouchTap={this.handleTap} />
    );
    const props = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog open={props.open} actions={standardActions} onRequestClose={props.handleRequestClose} >{props.content}</Dialog>
      </MuiThemeProvider>
    );
  }
}

export default DialogComponent;