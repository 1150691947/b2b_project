import React, { Component } from 'react';
import { Control } from "react-redux-form";
import { RequestLoading } from "./loadComponent";
import DialogComponent from "./dialog";
import "../css/request.css";
import { hashHistory } from "react-router";
// const TextareaComponent = (props) => <textarea {...props} className="textarea fontsize30" placeholder="写下对他的最想说的话，提高合作度"></textarea>

export default class RequestPage extends Component {
	constructor(){
		super();
		this.state={
			dialogContent:"",
			open: false
		}
	}

	handleSubmit(){

		let value = this.props.form.requestText.text;
		const pageId = this.props.location.query.id;
		const formData = {
			cid: pageId,
			message: value 
		};
		const { postFormData } = this.props.actions;
		
		if( value === '' ){	
			this.setState({
				dialogContent:"写下合作描述，提高合作度",
				open: true
			});
		}else {
			postFormData( "request", formData );
		}	
	} 

	componentWillReceiveProps( nextProps, nextState ){
		if( this.props !== nextProps ){
			const { postFormData, actions } = nextProps;
			if( postFormData.didInvalidate && !postFormData.error ){
				const errcode = postFormData.response.errcode;
					if( errcode === 1003 ){
						this.setState({
							dialogContent:"不能重复提交",
							open: true
						});	
					}else {
						actions.resetPostFormState();//重置表单状态
					hashHistory.push("/news/sendRecord");	
					}
				console.log( postFormData.response.errcode )
			}else if( postFormData.didInvalidate && postFormData.error ) {
				this.setState({
					dialogContent:"发送失败",
					open: true
				});	
			}
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

	handleClose(){
		const { resetPostFormState } = this.props.actions;
		resetPostFormState();//重置表单状态
		this.setState({
			open: false
		})
	}

	componentDidMount(){
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions,
			  { detailsPageData } = this.props;
		//拉取数据
		detailsPageData.title ? detailsPageData : fetchData( "GET_DETAILS_DATA", "details", pageId );
	}
 
	render(){
		const detailsPageData = this.props.detailsPageData.data;
		const isFetching = this.props.postFormData.isFetching;
		return ( 
			<div className="request-page"> 
				<div className="info-container">
					<div className="container clearfix">
						<div className="left-container fontsize28 fl">{`【${detailsPageData.name}】${detailsPageData.title}`}</div>
						<img src={detailsPageData.headimgurl} className="cover fr" alt="logo" />
					</div>
				</div> 
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
				<RequestLoading isFetching={isFetching} />
				<div className="textarea-container fontsize30">
					<Control.textarea model="form.requestText.text" placeholder="写下合作描述，提高合作度" />
				</div>
				<div className="btn-container fontsize30">
					<div className="btn submit-btn" onClick={this.handleSubmit.bind(this)}>提交</div>
					<div className="btn skip-btn" onClick={this.skipOperation.bind(this)}>跳过</div>
				</div>
			</div>
		)  
	} 
}


