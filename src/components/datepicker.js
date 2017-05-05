import React,{ Component } from "react";
import DatePicker from 'react-mobile-datepicker';

export default class Datepicker extends Component {

    handleSelect = (time) => {
        this.props.handleSelectTime( time.toLocaleDateString() )
    }

    render() {
        const date = new Date();
        return (
            <div className="data-picker">
                <DatePicker
                    theme="ios" 
                    isOpen={this.props.datepickerIsDisplay}
                    min={new Date(date.toLocaleDateString())}
                    onSelect={this.handleSelect.bind(this)}
                    onCancel={this.props.handleCancel} />
            </div>
        )
    }
}
