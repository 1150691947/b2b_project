/*邀合作页面*/
import React, { Component } from "react";
import { Link } from "react-router";
import classnames from "classnames";
import { NoData, Loading } from "./loadComponent";
import DialogTwoBtn from "./dialogTwoBtn";
// import TextareaAutosize from 'react-autosize-textarea';
import "../css/invited.css"

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
		<div className="info-container fontsize24">
			<p className="industry">行业：{props.trade}</p>
			<p className="nature">性质：{props.property}</p>
			<p className="scale">规模：{props.scale}</p>
		</div>
	) 
}
  
const TabMenu = ( props ) => {
	return (
		<div className="tab-menu fontsize36">
			<div className={classnames("menu-item",{"active":props.tabState})}  onClick={!props.tabState ? props.handleClick : ""}>未处理</div>
			<div className={classnames("menu-item",{"active":!props.tabState})}  onClick={props.tabState ? props.handleClick : ""}>已处理</div>
		</div>
	) 
}

//我发布的信息
const Irelease = ( props ) => {
	return (
		<div className="i-release fontsize28">
			<h3 className="text">我发布的合作信息</h3>
			<p className="desc">{`【${props.name}】${props.title}`}</p>
		</div>
	)
}

//未处理
// <TextareaAutosize placeholder="嗨，增加合作度。。。。" style={{ minHeight: "1.9rem"}} />
class UntreatedItem extends Component {
	handleClick(id){
		this.props.handleClick(id);
	}
	render(){
		const props = this.props;
		return ( 
			<li className="invited-item">
					<div className="container">
						<div className="clearfix">
							<LogoAndName {...props} />
							<div onClick={this.handleClick.bind(this,props.id)} className="agree fr fontsize30">同意</div>
						</div>
						<Link to={`/invitedDetails?id=${props.id}`}>
							{ props.message !== "" ? <div className="textarea-container fontsize30">{props.message}</div>  : ""}
							
								<Info {...props} />
								<div className="tigong ">
									<div className="title fontsize30">我们提供</div>
									<p className="content fontsize28">{props.supply}</p>
								</div>
								<p className="rem-time fontsize24">剩余时间：{props.remain_time}</p>
						</Link>
					</div>
				<Link to={`/invitedDetails?id=${props.id}`}>
					<Irelease {...props} />
				</Link>
			</li>
		)
	}
}
//已处理
const ProcessedItem = ( props ) => {
	return (
		<li className="invited-item">
			<Link>
				<div className="container">
					<div className="clearfix">
						<LogoAndName {...props} />
						<div className="iconfont fr fontsize40">&#xe609;</div>
					</div>
					<Info {...props} />
					<div className="tigong ">
						<div className="title fontsize30">我们提供</div>
						<p className="content fontsize28">{props.supply}</p>
					</div>
					{ ( props.status === 0 ) && <p className="rem-time fontsize24">剩余时间：{props.remain_time}</p>}
				</div>	
				<Irelease {...props} />
				<footer className="footer fontsize30">
					联系人：{props.linkman}    {props.tel}
				</footer>
			</Link>
		</li>
	)
}

export default class Invited extends Component {
	constructor(props){
		super(props);
		const { state } = this.props.location.query;

		this.state = {
			tabState : state === 0,
			open: false,
			dialogContent:"同意合作？",
			id: ''
		}
	}
	//切换列表
	handleClick(){
		const tabState = this.state.tabState;
		const { fetchData } = this.props.actions;
		const { ...invitedData } = this.props.invitedData;
	 	if( tabState ){
	 		if( !invitedData.proDidInvalidate ){
	 			fetchData( "GET_PROCESSED", "invited", 1 );
	 		}
	 	}else {
	 		if( !invitedData.notDidInvalidate ){
	 			fetchData( "GET_NOT_PROCESSED", "invited", 2 );
	 		}

	 	}
	 	this.setState({
			tabState : !this.state.tabState
		});
	}
  
	//同意
	handleAgree(id){
		const { fetchData } = this.props.actions;
		const options = {
			id: this.state.id,
			val : 1
		}
		fetchData( "AGREE_TO_INVITE","invited_argee", options );
		fetchData( "GET_NOT_PROCESSED", "invited", 2 );
		this.setState({
			open: false
		})
	} 

	handleClose(){
		this.setState({
			open: false
		})
	} 

	handleOpen(id){
		this.setState({
			open: true,
			id
		})
	}

	componentDidMount(){
		const { tabState } = this.state;
		const { fetchData } = this.props.actions;
		const { ...invitedData } = this.props.invitedData;
		if( tabState ){
	 		if( invitedData.notRespond.length === 0 ){
	 			fetchData( "GET_NOT_PROCESSED", "invited", 2 );
	 		}
	 	}else {
	 		if( invitedData.processed.length === 0 ){
	 			fetchData( "GET_PROCESSED", "invited", 1 );
	 		}
	 	}
		
	}
	render(){
		const { tabState } = this.state;
		const { ...invitedData } = this.props.invitedData;
		return(
			<div className="invited-page">
				<div className="label-block fontsize24">未处理7天以上自动默认拒绝</div>
				<DialogTwoBtn open={this.state.open} content={this.state.dialogContent} handleEnsure={this.handleAgree.bind(this)}  onRequestClose={this.handleClose.bind(this)} /> 
				<TabMenu tabState={tabState} handleClick={this.handleClick.bind(this)} />
				<ul className={classnames("list",{"list-active":tabState})}>
					{ invitedData.notRespond.length === 0 ? ( invitedData.isFetching ? <Loading /> : <NoData /> ) : invitedData.notRespond.map(( item, index ) => <UntreatedItem handleClick={this.handleOpen.bind(this)} key={index} {...item}  />)}
				</ul>
				<ul className={classnames("list",{"list-active":!tabState})}>
					{ invitedData.processed.length === 0 ? ( invitedData.isFetching ? <Loading /> : <NoData /> )  : invitedData.processed.map(( item, index ) => <ProcessedItem handleClick={this.handleOpen.bind(this)} key={index} {...item}  />)}
				</ul>
			</div>
		)
	}
} 

// <DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />