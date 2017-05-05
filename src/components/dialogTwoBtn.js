import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
// import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const bthStyle = {
  "width":"50%"
}
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class DialogTwoBtn extends Component {
 
  handleCancel = () => {
    this.props.onRequestClose()
  }
  handleEnsure = () => {
    this.props.handleEnsure()
  }
  render() {
     
    const  actions = [
      <FlatButton 
        label="取消" 
        primary={true}
        onTouchTap={this.handleCancel} 
        style={bthStyle} />,
        <FlatButton 
        label="确定"
        primary={true}
        onTouchTap={this.handleEnsure} 
        style={bthStyle} />
    ];
    const props = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <Dialog open={props.open} actions={actions} onRequestClose={props.handleRequestClose} >{props.content}</Dialog>
      </MuiThemeProvider>
    );
  }
}

export default DialogTwoBtn;