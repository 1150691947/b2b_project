import React, { Component } from 'react';
import { Control } from "react-redux-form";
import { Field, reduxForm } from 'redux-form';
 
import "../css/request.css";

// const TextareaComponent = (props) => <textarea {...props} className="textarea fontsize30" placeholder="写下对他的最想说的话，提高合作度"></textarea>
class SimpleForm extends Component {
  render(){
  	const { handleSubmit } = this.props
	  return (
	    <form onSubmit={handleSubmit}>
	      <div>
	        <div className="textarea-container fontsize30">
	          <Field name="message" component="textarea" placeholder="写下对他的最想说的话，提高合作度"/>
	        </div>
	      </div>
	      <div className="btn-container fontsize30">
	        <button type="submit" className="btn submit-btn fontsize30" >提交</button>
			<div className="btn skip-btn" onClick={this.props.skipOperation}>跳过</div>
	      </div>
	    </form>
	  )
  }
}

SimpleForm = reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)


export default class RequestPage extends Component {

	handleSubmit( values ){

		const pageId = this.props.location.query.id,
			  message = values.message;
		const formData = {
			cid: pageId,
			message
		};
		const { postFormData } = this.props.actions;
		
		postFormData( "request", formData );	

	}

	componentWillUpdate( nextProps, nextState ){
		const { postFormData } = nextProps;
		if( postFormData.isFetching ){
			alert("发送中")
		}else if( postFormData.didInvalidate ){
			alert("发送完成")
		}
	}

	skipOperation(){
		const pageId = this.props.location.query.id;
		const formData = {
			cid: pageId,
			message: '' 
		};
		const { postFormData } = this.props.actions;
		postFormData( "request", formData );
	}

	componentDidMount(){
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions,
			  { detailsPageData } = this.props;
		//拉取数据
		detailsPageData.title ? detailsPageData : fetchData( "GET_DETAILS_DATA", "details", pageId );
	}
 
	render(){
		const { detailsPageData } = this.props;
		const isFetching = this.props.postFormData.isFetching;
		// !isFetching && alert("发送完成")
		return ( 
			<div className="request-page"> 
				<div className="info-container">
					<div className="container clearfix">
						<div className="left-container fontsize28 fl">{detailsPageData.title}</div>
						<img src={detailsPageData.imgurl} className="cover fr" alt="logo" />
					</div>
				</div> 
				{/*<div className="textarea-container fontsize30">
					<Control.textarea model="form.requestText.text" placeholder="写下对他的最想说的话，提高合作度" />
				</div>*/}
				<SimpleForm onSubmit={this.handleSubmit.bind(this)} skipOperation={this.skipOperation.bind(this)} />
			</div>
		) 
	} 
}


