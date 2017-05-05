/*邀请合作详情*/
import React, { Component } from "react";
import "../css/invitedDetails.css";
import {hashHistory} from "react-router";
import DialogTwoBtn from "./dialogTwoBtn";
 
const LogoAndName = ( props ) => {
	return (
		<div className="logo-container fl">
			<div className="logo fl">
				<img src={props.headimgurl} alt=""/>
			</div>
			<div className="fl">
				<p className="name fontsize30">{props.nickname}</p>
				<p className="time fontsize24">{props.create_time}</p>
			</div>
		</div>  
	) 
} 
 
const Info  = ( props ) => {
	return (
		<div className="info-container fontsize24 ">
			<p className="industry">行业：{props.trade}</p>
			<p className="nature">性质：{props.property}</p>
			<p className="scale">规模：{props.scale}</p>
		</div> 
	)
}

export default class InvitedDetails extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			dialogContent:"",
			status:''
		}
	}
	componentDidMount(){
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions;
		//拉取数据
		fetchData( "GET_DETAILS_DATA", "invited_details", pageId ); 
	}
	handleClick(method){
		 
		if( method === 0 ){
			// hashHistory.push( `news/invited?state=${0}` )
			this.setState({
				open: true,
				dialogContent: "是否忽略该合作请求？",
				status: 0
			});
		}else if( method === 1 ){
			// hashHistory.push( `news/invited?state=${1}` )
			this.setState({
				open: true,
				dialogContent: "是否同意该合作请求？",
				status: 1
			});
		}
	}
	//关闭弹框
	handleClose(){
		this.setState({
			open: false
		})
	} 
	//同意
	handleEnsure(){
		this.setState({
			open: false
		});
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions;
		//邀请操作
		const options = {
			id : pageId,
			method : 1
		}
		fetchData( "INVITE_OPERATION", "invitedDetails", options ); 
		hashHistory.push( `news/invited?state=${1}` )
	}
	//忽略
	handleIgnore(){
		this.setState({
			open: false
		});
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions;
		//邀请操作
		const options = {
			id : pageId,
			method : 0
		}
		fetchData( "INVITE_OPERATION", "invitedDetails", options ); 
		hashHistory.push( `news/invited?state=${0}` )
	}
	render(){
		const detailsPageData = this.props.detailsPageData.data;
		const { status } = this.state;
		return (
			<div className="invited-details">
			<DialogTwoBtn open={this.state.open} content={this.state.dialogContent} handleEnsure={ status === 1 ? this.handleEnsure.bind(this) : this.handleIgnore.bind(this)}  onRequestClose={this.handleClose.bind(this)} /> 
				<div className="label-block fontsize24">未处理7天以上自动默认拒绝</div>
				<div className="container">
					<div className="clearfix">
						<LogoAndName {...detailsPageData} />
					</div>
					<Info {...detailsPageData} />
					<div className="rem-time fontsize24">剩余时间：{detailsPageData.remain_time}</div>
				</div>
				<div className="introduce">
					<h2 className="title fontsize30">公司介绍</h2>
					<p className="desc fontsize28">{detailsPageData.company_describe}</p>
				</div>
				<div className="btn-cont fontsize36">
					<div className="left-btn btn" onClick={this.handleClick.bind(this,0)}>忽略</div>
					<div className="right-btn btn" onClick={this.handleClick.bind(this,1)}>同意</div>
				</div>
			</div>
		)
	}
}