import React,{ Component } from "react";
import DatePicker from 'react-mobile-datepicker';

export default class Datepicker extends Component {

    constructor(){
        super();

        this.state = {
            isOpen: false
        }
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
        console.log( time )
    }

    render() {
        return (
            <div className="App">
                <a href="javascript:;"
                    className="select-btn"
                    onClick={this.handleClick}>
                    select time
                </a>
                <p className="select-time ">
                </p>

                <DatePicker
                    theme="ios"
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel} />
            </div>
        )
    }
}
