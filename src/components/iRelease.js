import React, { Component } from "react";
import { Link } from "react-router";
import { NoData, Loading } from "./loadComponent";
import DialogTwoBtn from "./dialogTwoBtn";
import "../css/iRelease.css";
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Expire = ( props ) => (
	<div className="clearfix overdue">
		<div className="fl">合作意向：{props.cq}</div>
		<div className="fr">已过期</div>
	</div>
)

const PlaceholderComponent = ( props ) => (
	<div className="img-placeholder">微 耀</div>
)

const Cooperation = ( props ) => (
	<div className="cooperation">联系人：{props.linkman}<span className="line">|</span>{props.tel}</div>
)

const RemainTime = ( props ) => (
	<div className="remain-time">剩余：{props.remainTime}天</div>
)

const Item = ( props ) => {
	return (
		<li className="item fontsize28">
				<div className="clearfix header-container">
					<div className="release-time fl">发布时间{props.create_time}</div>
					{ (props.remain_time > 0 && props.remain_time <= 3) && <div className="btn fr fontsize24" onClick={props.handleClick.bind(null,props.id)}>延长7天</div>}
				</div>
			<Link to={`details?entryPage=iRelease&id=${props.id}`}>
				<div className="container clearfix">
					<h2 className="fl title fontsize28" style={{"width": props.imgurl ? "6.34667rem" : "100%"}}>{`【${props.name}】${props.title}`}</h2>
					{props.imgurl &&<div className="logo fr">
						<LazyLoad throttle={200} height={81} placeholder={<PlaceholderComponent />} >
				            <ReactCSSTransitionGroup
				              transitionName="fade"
				              transitionAppear={true}
				              transitionAppearTimeout={500}
				              transitionEnter={false}
				              transitionLeave={false}>
				              <img src={`${props.imghost}${props.imgurl}`} alt="" />
				            </ReactCSSTransitionGroup>
				          </LazyLoad>
					</div>}
				</div> 
				<div className="footer-container fontsize30">
					{
						props["is_expire "] ? ( ( props.cq >= 0 ) ? <Expire cq={props.cq} /> : <RemainTime remainTime={props.remain_time} /> )  : <Cooperation linkman={props.linkman} tel={props.tel} />
						
					}   
				</div>  
			</Link> 
		</li>   
	)
}   

export default class IRelease extends Component{
	constructor(){
		super();
		this.state = {
			open: false,
			dialogContent: "",
			id: ""
		}
	}
	componentDidMount(){
		this.props.actions.fetchData( "GET_IRELEASE_DATA", "iRelease" );
		 const { imghost } = this.props.uploadToken;
		!imghost && this.props.actions.fetchData( "GET_IMGHOST", "getImgHost" );
	}
	handleClick(id){
		this.setState({
			open: true,
			dialogContent: "延长7天有效时间？",
			id
		});
	}
	//取消
	handleClose(){
		this.setState({
			open: false
		});
	}
	//确定
	handleEnsure(){
		this.setState({
			open: false
		});
		this.props.actions.fetchData( "TIME_EXPAND", "timeExpand", this.state.id );
		this.props.actions.fetchData( "GET_IRELEASE_DATA", "iRelease" );
	}
	render(){
		const { iReleaseData } = this.props;
		const { imghost } = this.props.uploadToken;
		return(
			<div className="iRelease-page">
				<ul className="list">
					{
						iReleaseData.data.length === 0 ? ( iReleaseData.isFetching ? <Loading /> : <NoData /> ) : iReleaseData.data.map(( item,index ) => <Item imghost={imghost} key={index} handleClick={this.handleClick.bind(this)} {...item} />)
					}
				</ul>
				<DialogTwoBtn open={this.state.open} content={this.state.dialogContent} handleEnsure={ this.handleEnsure.bind(this) }  onRequestClose={this.handleClose.bind(this)} /> 
			</div>	
		)
	}
}