import React, { Component } from 'react';

import { Control } from "react-redux-form";
 
import "../css/request.css";

// const TextareaComponent = (props) => <textarea {...props} className="textarea fontsize30" placeholder="写下对他的最想说的话，提高合作度"></textarea>

export default class RequestPage extends Component {

	handleSubmit(){

		let value = this.props.form.requestText.text;

		console.log( value )

	}

	render(){

		return ( 
			<div className="request-page">
				<div className="info-container">
					<div className="container clearfix">
						<div className="left-container fontsize28 fl">提供旗下签约主播网红艺人／直播／微博／资源／网综广告位资源，寻求资源置换。</div>
						<img src="" className="cover fr" alt="logo" />
					</div>
				</div>
				<div className="textarea-container fontsize30">
					<Control.textarea model="form.requestText.text" />
				</div>

				<div className="btn-container fontsize30">
					<div className="btn submit-btn" onClick={this.handleSubmit.bind(this)}>提交</div>
					<div className="btn skip-btn" >跳过</div>
				</div>
			</div>
		) 
	}
}


